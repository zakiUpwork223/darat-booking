import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateSubServiceDto } from './dto/create-subService.dto';
import { UpdateSubServiceDto } from './dto/update-subService.dto';

@Injectable()
export class MedicalServicesService {
  constructor(
    private prismaService: PrismaService,
  ) { }
  
  async createService(createServiceDto: CreateServiceDto) {
    try {
      const serviceCreated = await this.prismaService.service.create({
        data: {
          ...createServiceDto, subService:null,
        }
      });

      if (!serviceCreated) {
        throw new BadRequestException('Service not created')
      }

      return serviceCreated
    } catch (error) {
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.error(error.message)
        throw new InternalServerErrorException(
          `Error in creating Service`,
        );
      }
      if (error.code === 'P2002') {
        throw new BadRequestException("Service with this name already exists")
      } 
      throw error
    }
  }

  async createSubService(createSubServiceDto: CreateSubServiceDto) {
    try {
      const subServiceCreated = await this.prismaService.service.create({
        data: {
          ...createSubServiceDto,
        }
      });

      if (!subServiceCreated) {
        throw new BadRequestException('Sub Service not created')
      }

      return subServiceCreated
    } catch (error) {
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.error(error.message)
        throw new InternalServerErrorException(
          `Error in creating Sub Service`,
        );
      }
      if (error.code === 'P2002') {
        throw new BadRequestException("Sub Service with this name already exists")
      } 
      throw error
    }
  }

  async findAllServices() {
    try {
      const allServices = await this.prismaService.service.findMany({
        where:{subService:null}
      });


      return allServices;
    } catch (error) {
      throw error
    }
  }

  async findAllSubServices() {
    try {
      const allSubServices = await this.prismaService.service.findMany({
        where: {
          subService: {
            not: null
          }
        }
      });
  
      return allSubServices;
    } catch (error) {
      throw error;
    }
  }

  async findAllSubServicesByServiceId(subService:string) {
    try {
      console.log("here")
      const allSubServices = await this.prismaService.service.findMany({
        where: {
          subService: subService
        }
      });
  
      return allSubServices;
    } catch (error) {
      throw error;
    }
  }
  

  async findOneService(id: string) {
    try {
      const serviceFound = await this.prismaService.service.findUnique({
        where:{
          id : id,
          subService: null
        },
        include:{
          schedule:{
            include:{
              doctorId:true
            }
          }
        }
      });

      if (!serviceFound) {
        throw new BadRequestException('Service not found')
      }

      return serviceFound;
    } catch (error) {
      throw error
    }
  }

  async findOneSubService(id: string) {
    try {
      const subServiceFound = await this.prismaService.service.findUnique({
        where:{
          id : id,
          subService: {
            not: null
          }
        },
        include:{
          schedule:{
            include:{
              doctorId:true
            }
          }
        }
      });

      if (!subServiceFound) {
        throw new BadRequestException('Sub Service not found')
      }

      return subServiceFound;
    } catch (error) {
      throw error
    }
  }

  async updateService(id: string, updateServiceDto: UpdateServiceDto) {
    try {
      await this.findOneService(id)
      const servicesUpdate = await this.prismaService.service.update({
        where:{
          id : id,
          subService:null
        },
        data:{
          ...updateServiceDto, subService:null
        }
      });

      if (!servicesUpdate) {
        throw new BadRequestException('Service not found')
      }

      return servicesUpdate;
    } catch (error) {
      throw error
    }
  }

  async updateSubService(id: string, updateSubServiceDto: UpdateSubServiceDto) {
    try {
      await this.findOneSubService(id)
      const servicesUpdate = await this.prismaService.service.update({
        where:{
          id : id,
          subService:{
            not: null
          }
        },
        data:{
          ...updateSubServiceDto, 
        }
      });

      if (!servicesUpdate) {
        throw new BadRequestException('Sub Service not found')
      }

      return servicesUpdate;
    } catch (error) {
      throw error
    }
  }

  async removeService(id: string) {
    try {
      await this.findOneService(id)
      const serviceDeleted = await this.prismaService.service.delete({
        where:{
          id : id
        }
      });

      if (!serviceDeleted) { // check this if . the object is not returned like this
        throw new BadRequestException('Service not found')
      }

      return {message : `Service ${serviceDeleted.name} deleted` };
    } catch (error) {
      throw error
    }

  }

  async removeSubService(id: string) {
    try {
      await this.findOneSubService(id)
      const SubServiceDeleted = await this.prismaService.service.delete({
        where:{
          id : id
        }
      });

      if (!SubServiceDeleted) { // check this if . the object is not returned like this
        throw new BadRequestException('Sub Service not found')
      }

      return {message : `Sub Service ${SubServiceDeleted.name} deleted` };
    } catch (error) {
      throw error
    }

  }
}
