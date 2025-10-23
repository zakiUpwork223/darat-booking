import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { generateRandom4DigitNumber, hashPassword } from 'src/utils/utility.functions';
import { MailerService } from 'src/mailer/mailer.service';
import { VerifyService } from 'src/utils/verify.service';

@Injectable()
export class PatientService {
  constructor(
    private prismaService: PrismaService,
    private mailerService: MailerService,
    private verifyService : VerifyService
  ) { }

  async createPatient(createPatientDto: CreatePatientDto) {

    try {
      const checkExisitingAdmin =  await this.prismaService.admin.findUnique({
        where:{
          email : createPatientDto.email
        }
      }) //just to be on safe side
      const checkExisitingDoctor =  await this.prismaService.doctor.findUnique({
        where:{
          email : createPatientDto.email
        }
      }) //just to be on safe side

      if(checkExisitingAdmin || checkExisitingDoctor){
        throw new BadRequestException("This email already exists in Admin/Doctor")
      }
      const hashedPassword = await hashPassword(createPatientDto.password)
      const patientCreated = await this.prismaService.patient.create({
        data: {
          ...createPatientDto,
          password: hashedPassword
        }
      });

      if (!patientCreated) {
        throw new BadRequestException('Patient not created')
      }

      //const otp = await generateAndStoreOTP(patientCreated.email, 'email' , this.prismaService)

      const verifyData =  await this.verifyService.generateAndStoreOTP(patientCreated.email, 'Patient')
      const body = `otp for booking engine : ${verifyData.otp}`
      const sendEmail = await this.mailerService.sendEmail(createPatientDto.email, 'OTP for verification Booking Engine', body)


      return {message : "User created. Verify your account"}
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.error(error.message)
        throw new BadRequestException(
          `Duplicte Email/Contact Number`,
        );
      }
      throw error
    }
  }

  async findAllPatients() {
    try {
      const patientFound = await this.prismaService.patient.findMany({});

      if (!patientFound) {
        throw new BadRequestException('Patients not found')
      }

      return patientFound;
    } catch (error) {
      throw error
    }

  }

  async findOnePatientByID(id: string) {
    try {
      const patientFound = await this.prismaService.patient.findUnique({
        where: {
          id: id
        },
        select: {
          id: true,
          profilePic:true,
          name : true, // used in payment service.ts in create customer
          email: true,
          contactNumber: true,
          role: true,
          medicalHistory:true,
          password:true //not added before implementing reset password
        }
      });

      if (!patientFound) {
        throw new BadRequestException('Patient not found')
      }
      return patientFound;
    } catch (error) {
      throw error
    }

  }

  async findOnePatientByEmail(userEmail: string) {

    try {
      const patientFound = await this.prismaService.patient.findUnique({
        where: {
          email: userEmail
        }
      });

      if (!patientFound) {
        throw new BadRequestException('Patient not found')
      }
      
      if (patientFound.email === userEmail && !patientFound.is_emailVerified) {
        throw new UnauthorizedException('Email found, but user not verified');
      }
      

      return patientFound;
    } catch (error) {
      throw error
    }
  }

  async findOnePatientByPhone(userPhone: string) {

    try {
      const patientFound = await this.prismaService.patient.findUnique({
        where: {
          contactNumber: userPhone
        }
      });

      if (!patientFound) {
        throw new BadRequestException('Patient not found')
      }

      if (patientFound.contactNumber === userPhone && !patientFound.is_contactNumberVerified) {
        throw new UnauthorizedException('User found, but user not verified');
      }

      return patientFound;
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    try {

      await this.findOnePatientByID(id)
      const patientUpdate = await this.prismaService.patient.update({
        where: {
          id: id
        },
        data: {
          ...updatePatientDto,
          is_contactNumberVerified: false,
          is_emailVerified: false
        }
      });

      if (!patientUpdate) {
        throw new BadRequestException('Patient not found')
      }

      return patientUpdate;
    } catch (error) {
      throw error
    }

  }

  async remove(id: string) {
    try {
      await this.findOnePatientByID(id)
      const patientDeleted = await this.prismaService.patient.delete({
        where: {
          id: id
        }
      });

      //@todo check why patient.delete not working when id is not found
      if (!patientDeleted) {
        throw new BadRequestException('Patient not found')
      }

      return { message: `Patient ${patientDeleted.name} deleted` };
    } catch (error) {
      throw error
    }

  }
}
