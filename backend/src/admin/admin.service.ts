import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/utils/utility.functions';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(
    private prismaService: PrismaService,
  ) { }
  async createAdmin(createAdminDto: CreateAdminDto) {
    try {
      const checkExisitingDoctor =  await this.prismaService.doctor.findUnique({
        where:{
          email : createAdminDto.email
        }
      }) //just to be on safe side
      const checkExisitingPatient =  await this.prismaService.patient.findUnique({
        where:{
          email : createAdminDto.email
        }
      }) //just to be on safe side

      if(checkExisitingDoctor || checkExisitingPatient){
        throw new BadRequestException("This email already exists in Doctor/Patient")
      }
      const hashedPassword = await hashPassword(createAdminDto.password)      
      const adminCreated = await this.prismaService.admin.create({
        data: {
          ...createAdminDto,
          password: hashedPassword
        }
      });

      if (!adminCreated) {
        throw new BadRequestException('Admin not created')
      }

      return adminCreated
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

  async findAllAdmins() {
    try {
      const adminFound = await this.prismaService.admin.findMany({});

      if (!adminFound) {
        throw new BadRequestException('Admin not found')
      }

      return adminFound;
    } catch (error) {
      throw error
    }
  }

  
  async findOneAdminByID(id: string) {
    try {
      const adminFound = await this.prismaService.admin.findUnique({
        where: {
          id: id
        },
        select:{
          id:true,
          profilePic:true,
          email:true,
          contactNumber:true,
          role:true,
          password:true //not added before implementing reset password
        }
      });

      if (!adminFound) {
        throw new BadRequestException('Admin not found')
      }

      return adminFound;
    } catch (error) {
      throw error
    }
  }

  async findOneAdminByEmail(userEmail: string) {

    try {
      const adminFound = await this.prismaService.admin.findUnique({
        where: {
          email: userEmail
        }
      });

      if (!adminFound) {
        throw new BadRequestException('Admin not found')
      }
      
      if (adminFound.email === userEmail && !adminFound.is_emailVerified) {
        throw new UnauthorizedException('Email found, but user not verified');
      }

      return adminFound;
    } catch (error) {
      throw error
    }
  }

  async findOneAdminByPhone(userPhone: string) {

    try {
      const adminFound = await this.prismaService.admin.findUnique({
        where: {
          contactNumber: userPhone
        }
      });

      if (!adminFound) {
        throw new BadRequestException('Admin not found')
      }

      if (adminFound.contactNumber === userPhone && !adminFound.is_contactNumberVerified) {
        throw new UnauthorizedException('User found, but user not verified');
      }

      return adminFound;
    } catch (error) {
      throw error
    }
  }

  async updateAdmin(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      await this.findOneAdminByID(id)
      const adminUpdated = await this.prismaService.admin.update({
        where: {
          id: id
        },
        data: {
          ...updateAdminDto
        }
      });

      if (!adminUpdated) {
        throw new BadRequestException('Admin not found')
      }

      return adminUpdated;
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      await this.findOneAdminByID(id)
      const adminDeleted = await this.prismaService.admin.delete({
        where:{
          id : id
        }
      });

      if (!adminDeleted) {
        throw new BadRequestException('Admin not found')
      }

      return {message : `Admin ${adminDeleted.name} deleted` };
    } catch (error) {
      throw error
    }

  }
}
