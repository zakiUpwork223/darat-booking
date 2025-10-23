import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { comparePassword, hashPassword, isEmailOrPhoneNumber } from 'src/utils/utility.functions';
import { PatientService } from 'src/patient/patient.service';
import { AdminService } from 'src/admin/admin.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DoctorService } from 'src/doctor/doctor.service';
import { VerifyService } from 'src/utils/verify.service';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestUser, User } from './entities/user.entity';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwt: JwtService,
    private prismaService: PrismaService,
    private patientService: PatientService,
    private adminService: AdminService,
    private doctorService: DoctorService,
    private verifyService: VerifyService,
    private mailerService: MailerService,

  ) { }

  signup(signupDto: SignUpDto) {
    // only patient is signing up for now so no need for this
    // use create patient api 
  }


  async login(loginDto: LogInDto) {
    switch (loginDto.role) {
      case 'Patient': {
        const type = isEmailOrPhoneNumber(loginDto.username)
        if (type === 'phone') {
          const patientData = await this.patientService.findOnePatientByPhone(loginDto.username)
          await comparePassword(loginDto.password, patientData.password)
          const token = await this.generateToken(patientData.id, 'Patient')

          return { access_token: token };
        }
        if (type === 'email') {
          const patientData = await this.patientService.findOnePatientByEmail(loginDto.username)
          await comparePassword(loginDto.password, patientData.password)
          const token = await this.generateToken(patientData.id, 'Patient')

          return { access_token: token };
        }
        break;
      }
      case 'Doctor': {
        const type = isEmailOrPhoneNumber(loginDto.username)
        if (type === 'phone') {
          const doctorData = await this.doctorService.findOneDoctorByPhone(loginDto.username)
          await comparePassword(loginDto.password, doctorData.password)
          const token = await this.generateToken(doctorData.id, 'Doctor')

          return { access_token: token };
        }
        if (type === 'email') {
          const doctorData = await this.doctorService.findOneDoctorByEmail(loginDto.username)
          await comparePassword(loginDto.password, doctorData.password)
          const token = await this.generateToken(doctorData.id, 'Doctor')

          return { access_token: token };
        }
        break;
      }

      case 'Admin': {
        const type = isEmailOrPhoneNumber(loginDto.username)
        if (type === 'phone') {
          const adminData = await this.adminService.findOneAdminByPhone(loginDto.username)
          await comparePassword(loginDto.password, adminData.password)
          const token = await this.generateToken(adminData.id, adminData.role)

          return { access_token: token };
        }
        if (type === 'email') {
          const adminData = await this.adminService.findOneAdminByEmail(loginDto.username)
          await comparePassword(loginDto.password, adminData.password)
          const token = await this.generateToken(adminData.id, adminData.role)

          return { access_token: token };
        }
        break;
      }

    }
  }

  async findUser(requestUser: RequestUser) {
    switch (requestUser.role) {
      case 'Patient': {
        const patientData = await this.patientService.findOnePatientByID(requestUser.id)
        return requestUser // sending the user object back . querying db above just as formality
      }
      case 'Doctor': {
        const doctorData = await this.doctorService.findOneDoctorById(requestUser.id)
        return requestUser// sending the user object back . querying db above just as formality
      }
      case 'Admin': {
        const adminData = await this.adminService.findOneAdminByID(requestUser.id)
        return requestUser// sending the user object back . querying db above just as formality
      }

      default: {
        break;
      }

    }
  }

  async verifyUser(username: string, code: string) {

    try {
      const verifyUser:User = await this.verifyService.verifyOTP(username, code)
      console.log(verifyUser.role);
      

      switch (verifyUser.role){
        case 'Patient': {
          const token = await this.generateToken(verifyUser.id, 'Patient')
          return { access_token: token };
        }
      }
      return verifyUser
    } catch (error) {
      throw error
    }
  }

  async resetUserPassword(resetPasswordDto: ResetPasswordDto, user) {
    try {
      if (resetPasswordDto.newPassword !== resetPasswordDto.confirmPassword) {
        throw new BadRequestException("Passwords donot match")
      }

      //const matchPassword = b
      switch (user.role) {
        case 'Patient': {
          const userData = await this.patientService.findOnePatientByID(user.id)
          await comparePassword(resetPasswordDto.oldPassword, userData.password)
          const updatedHashedPassword = await hashPassword(resetPasswordDto.newPassword)
          await this.prismaService.patient.update({
            where: {
              id: user.id
            },
            data: {
              password: updatedHashedPassword
            }
          })
        }
        case 'Admin': {
          const userData = await this.adminService.findOneAdminByID(user.id)
          await comparePassword(resetPasswordDto.oldPassword, userData.password)
          const updatedHashedPassword = await hashPassword(resetPasswordDto.newPassword)
          await this.prismaService.admin.update({
            where: {
              id: user.id
            },
            data: {
              password: updatedHashedPassword
            }
          })
        }
        case 'Doctor': {
          const userData = await this.doctorService.findOneDoctorById(user.id)
          await comparePassword(resetPasswordDto.oldPassword, userData.password)
          const updatedHashedPassword = await hashPassword(resetPasswordDto.newPassword)
          await this.prismaService.patient.update({
            where: {
              id: user.id
            },
            data: {
              password: updatedHashedPassword
            }
          })
        }
      }

    } catch (error) {
      throw error
    }

  }

  findOne(id: number) {

  }

  update(id: number,) {

  }

  remove(id: number) {

  }

  async generateToken(
    id: string,
    // contactNumber: string,
    // email: string,
    role: string,
  ) {
    const payload = {
      userId: id,
      // contactNumber: contactNumber,
      // email: email,
      role: role,
    };

    const jwt_secret = this.configService.get('JWT_SECRET');
    const jwt_expiryTime = this.configService.get('JWT_EXPIRY_TIME');

    //TODO : refresh token implementation remove expiry
    const token = await this.jwt.signAsync(payload, {
      expiresIn: jwt_expiryTime,
      secret: jwt_secret,
    });

    return token;
  }

  async sendEmailOTP(email: string) {
    //const isDoctor = await this.doctorService.fin 

    const isPatient = await this.prismaService.patient.findUnique({
      where:{
        email:email
      }
    })
    if (isPatient) {
      const verifyData = await this.verifyService.generateAndStoreOTP(isPatient.email, "Patient")
      const body = `otp for booking engine : ${verifyData.otp}`
      const sendEmail = await this.mailerService.sendEmail(isPatient.email, 'OTP for verification Booking Engine', body)

      return {message : `Email sent to ${isPatient.email}`}
    }
  }
}
