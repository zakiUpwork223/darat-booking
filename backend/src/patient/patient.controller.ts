import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  createPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.createPatient(createPatientDto);
  }

  @Get()
  findAllPatients() {
    return this.patientService.findAllPatients();
  }

  @Get(':id')
  findOnePatientByID(@Param('id') id: string) {
    return this.patientService.findOnePatientByID(id);
  }

  @Get(':id')
  findOnePatientByEmail(@Body('email') email: string) {
    return this.patientService.findOnePatientByEmail(email);
  }

  @UseGuards(JwtGuard)
  @Patch()
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto, @Req() req) {
    return this.patientService.update(req.user.id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
