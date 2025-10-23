import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ScheduleService } from './dr_schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Weekdays } from '@prisma/client';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.createSchedule(createScheduleDto);
  }

  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id?: string , @Query('doctorId') doctorId?: string,
  @Query('weekday') weekday?: Weekdays,) {
    //return this.scheduleService.findOne(id);
    if (doctorId && weekday) {
      return this.scheduleService.findOneByDoctorAndWeekday(doctorId, weekday);
    } else {
      return this.scheduleService.findOneScheduleById(id);
    }
  
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }

  @Post('getSlots/:scheduleId') // calculates slots of a given scheduleId
  getslots( @Param('scheduleId') scheduleId: string) {
    
    return this.scheduleService.calculateSlotsInASchedule(scheduleId);
  }

  @Post('doctorsOfAService/:serviceId') // gives doctors providing a particular service
  doctorsOfAService( @Param('serviceId') serviceId: string) {
    
    return this.scheduleService.findAllDoctorsOfAService(serviceId);
  }
}
