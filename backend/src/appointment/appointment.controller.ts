import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { BookedAppointmentDto } from './dto/booked-appointment.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/roleGuard/role.guard';
import { Role } from 'src/roleGuard/role.enum';
import { Roles } from 'src/roleGuard/role.decorator';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @UseGuards(JwtGuard)
  @Post('book')
  create(@Body() createAppointmentDto: CreateAppointmentDto, @Req() req) {
    return this.appointmentService.createBooking(createAppointmentDto, req.user);
  }

  @UseGuards(JwtGuard)
  @Post('cancel/:appointmentId')
  cancelAppointment(@Param() appointmentId: string, @Req() req) {
    return this.appointmentService.cancelAppointment(appointmentId, req.user);
  }

  @UseGuards(JwtGuard)
  @Get('/ofAPatient')
  findAllApointments(@Req() req) {
    return this.appointmentService.findAllApointments(req.user);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Doctor)
  @Post('/ofADoctor')
  findAllApointmentsOfUser(@Req() req, @Query('scheduledDate') scheduledDate?: string,
    @Query('status') status?: string) {
    return this.appointmentService.findAllApointmentsofDoctor(req.user, scheduledDate, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch('reschedule/:appointmentId')
  update(@Param('appointmentId') appointmentId: string, @Body() updateAppointmentDto: UpdateAppointmentDto , @Req() req) {
    return this.appointmentService.rescheduleAppointment(appointmentId, updateAppointmentDto , req.user);
  }


  @Post('appointmentsSlotsOfDoctor')
  doctorAppointments(@Body() bookedAppointmentDto: BookedAppointmentDto) {
    return this.appointmentService.doctorAppointments(bookedAppointmentDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Doctor)
  @Post('/markAsCompleted/:id')
  markAppointmentAsCompleted(@Req() req, @Param('id') id: string) {
    return this.appointmentService.markAppointmentAsCompleted(id ,req.user);
  }
  
  @Post('getAppointmentsForWeek')
  getAppointmentsForWeek() {
    return this.appointmentService.getAppointmentsForWeek();
  }

}
