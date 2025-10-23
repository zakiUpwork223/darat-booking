import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateRandomPassword, hashPassword } from 'src/utils/utility.functions';
import { Prisma } from '@prisma/client';
import { MailerService } from 'src/mailer/mailer.service';
import { VerifyService } from 'src/utils/verify.service';
import { PatientService } from 'src/patient/patient.service';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class DoctorService {
  constructor(
    private prismaService: PrismaService,
    private mailerService: MailerService,
    private patientService: PatientService,
    private adminService: AdminService
  ) { }

  async createDoctor(createDoctorDto: CreateDoctorDto) {
    try {
      const checkExisitingAdmin =  await this.prismaService.admin.findUnique({
        where:{
          email : createDoctorDto.email
        }
      }) //just to be on safe side
      const checkExisitingPatient =  await this.prismaService.patient.findUnique({
        where:{
          email : createDoctorDto.email
        }
      }) //just to be on safe side

      if(checkExisitingAdmin || checkExisitingPatient){
        throw new BadRequestException("This email already exists in Admin/Patient")
      }
      const password  = generateRandomPassword()
      //const hashedPassword = await hashPassword(createDoctorDto.password)      
      const hashedPassword = await hashPassword(password)      
      const doctorCreated = await this.prismaService.doctor.create({
        data: {
          ...createDoctorDto,
          password: hashedPassword,
          is_emailVerified:true
        }
      });

      if (!doctorCreated) {
        throw new BadRequestException('Doctor not created')
      }

      // const verifyData =  await this.verifyService.generateAndStoreOTP(patientCreated.email, 'Patient')
      const body = `Username and Password for booking engine are as follow : \n Username : ${doctorCreated.email} \n  Password : ${password} `
      const sendEmail = await this.mailerService.sendEmail(doctorCreated.email, 'OTP for verification Booking Engine', body)

      return {message : "Doctor Account created. Credentials are sent in email"}
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientUnknownRequestError ) {
        console.error(error.message)
        throw new BadRequestException(
          `Duplicte Email/Contact Number`,
        );
      }
      throw error
    }
  }

  async findAllDoctors() {

    try {
      const allDoctorsData = await this.prismaService.doctor.findMany({});

      //@todo remove as this returns an array. no need tot throw error. remove from all modules
      if (!allDoctorsData) {
        throw new BadRequestException('Doctors not found')
      }

      return allDoctorsData;
    } catch (error) {
      throw error
    }
    
  }

  async findOneDoctorById(id: string) {
    try {
      const doctorFound = await this.prismaService.doctor.findUnique({
        where:{
          id : id
        },
        select:{
          id:true,
          profilePic:true,
          name:true,
          email:true,
          contactNumber:true,
          role:true,
          password:true, //not added before implementing reset password
          patientReviews:true,
          reviewCount:true
        }
      });

      if (!doctorFound) {
        throw new BadRequestException('Doctor not found')
      }

      return doctorFound;
    } catch (error) {
      throw error
    }

  }

  async findOneDoctorByEmail(userEmail: string) {

    try {
      const doctorFound = await this.prismaService.doctor.findUnique({
        where: {
          email: userEmail
        }
      });

      if (!doctorFound) {
        throw new BadRequestException('Doctor not found')
      }
      
      if (doctorFound.email === userEmail && !doctorFound.is_emailVerified) {
        throw new UnauthorizedException('Email found, but user not verified');
      }
      

      return doctorFound;
    } catch (error) {
      throw error
    }
  }

  async findOneDoctorByPhone(userPhone: string) {

    try {
      const doctorFound = await this.prismaService.doctor.findUnique({
        where: {
          contactNumber: userPhone
        }
      });

      if (!doctorFound) {
        throw new BadRequestException('Doctor not found')
      }

      if (doctorFound.contactNumber === userPhone && !doctorFound.is_contactNumberVerified) {
        throw new UnauthorizedException('User found, but user not verified');
      }

      return doctorFound;
    } catch (error) {
      throw error
    }
  }


  async updateDoctor(id: string, updateDoctorDto: UpdateDoctorDto) {

    try {
      await this.findOneDoctorById(id)
      const doctorUpdated = await this.prismaService.doctor.update({
        where:{
          id : id
        },
        data:{
          ...updateDoctorDto
        }
      });

      if (!doctorUpdated) {
        throw new BadRequestException('Doctor not found')
      }

      return doctorUpdated;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientUnknownRequestError ) {
        console.error(error.message)
        throw new BadRequestException(
          `Duplicte Email/Contact Number`,
        );
      }
      throw error
    }
  }

  async removeDoctor(id: string) {

    try {
      await this.findOneDoctorById(id)
      const doctorDeleted = await this.prismaService.doctor.delete({
        where:{
          id : id
        }
      });

      if (!doctorDeleted) {
        throw new BadRequestException('Doctor not found')
      }

      return {message : `Doctor ${doctorDeleted.name} deleted` };
    } catch (error) {
      throw error
    }
  }
}
