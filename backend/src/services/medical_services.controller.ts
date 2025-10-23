import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalServicesService } from './medical_services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { CreateSubServiceDto } from './dto/create-subService.dto';
import { UpdateSubServiceDto } from './dto/update-subService.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';

@ApiTags('medical services')
@ApiResponseTags()
@Controller('medical_services')
export class MedicalServicesController {
  constructor(private readonly medicalServicesService: MedicalServicesService) {}

  @Post()
  createService(@Body() createServiceDto: CreateServiceDto) {
    return this.medicalServicesService.createService(createServiceDto);
  }

  @Post("sub-services")
  createSubService(@Body() createSubServiceDto: CreateSubServiceDto) {
    return this.medicalServicesService.createSubService(createSubServiceDto);
  }

  @Get()
  findAllServices() {
    return this.medicalServicesService.findAllServices();
  }

  @Get("sub-services")
  findAllSubServices() {
    return this.medicalServicesService.findAllSubServices();
  }


  @Get(':id')
  findOneService(@Param('id') id: string) {
    return this.medicalServicesService.findOneService(id);
  }


  @Get('sub-services/:id')
  findOneSubService(@Param('id') id: string) {
    return this.medicalServicesService.findOneSubService(id);
  }

  @Get('sub-services/by-service/:id')
  findSubServiceByServiceId(@Param('id') id: string) {
    return this.medicalServicesService.findAllSubServicesByServiceId(id);
  }

  @Patch(':id')
  updateService(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.medicalServicesService.updateService(id, updateServiceDto);
  }

  @Patch('sub-services/:id')
  updateSubService(@Param('id') id: string, @Body() updateSubServiceDto: UpdateSubServiceDto) {
    return this.medicalServicesService.updateSubService(id, updateSubServiceDto);
  }

  @Delete(':id')
  removeService(@Param('id') id: string) {
    return this.medicalServicesService.removeService(id);
  }

  @Delete('sub-services/:id')
  removeSubService(@Param('id') id: string) {
    return this.medicalServicesService.removeSubService(id);
  }
}
