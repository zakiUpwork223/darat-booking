import { BadRequestException, ConflictException, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { MedicalServicesService } from 'src/services/medical_services.service';
import { Weekdays } from '@prisma/client';

@Injectable()
export class ScheduleService {
  constructor(
    private prismaService: PrismaService,
    private doctorService: DoctorService,
    private medicalServicesService: MedicalServicesService,
  ) { }
  async createSchedule(createScheduleDto: CreateScheduleDto) { // check if doctor and service exists or not
    try {
      const { doctorId, serviceId, startTime, endTime, ...restData } = createScheduleDto

      await this.doctorService.findOneDoctorById(doctorId)
      await this.medicalServicesService.findOneService(serviceId)

      const scheduleDateNormalized = await this.setTimeToMidnight(createScheduleDto.scheduleDate)

      console.log("\n \n scheduleDateNormalized",scheduleDateNormalized);
      
      const normalisedStartTime = await this.replaceDatePartWithDefaultDate(startTime.toISOString())
      const normalisedEndTime = await this.replaceDatePartWithDefaultDate(endTime.toISOString())
      const existingSchedule = await this.prismaService.doctorSchedule.findMany({
        where: {
          doctor: doctorId,
          service:serviceId,
          scheduleDate: scheduleDateNormalized,
        },
      });
      const slotUpate = existingSchedule.length += 1

      console.log(existingSchedule);
      await this.checkTimeSlotOverlap(doctorId, createScheduleDto.scheduleDate, normalisedStartTime, normalisedEndTime)

      const doctorSchedule = await this.prismaService.doctorSchedule.create({
        data: {
          doctor: doctorId,
          service: serviceId,
          scheduleDate:scheduleDateNormalized,
          startTime: normalisedStartTime,
          endTime: normalisedEndTime,
          slotNumber: slotUpate,
          //slotCategory: timeSlotCategory,
          ...restData
        }
      })

      return doctorSchedule;
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {

      const doctorSchedule = await this.prismaService.doctorSchedule.findMany({
        include:{
          doctorId:true,
          serviceId:true
        }
      })

      return doctorSchedule;
    } catch (error) {
      throw error
    }
  }

  async findOneScheduleById(id: string) {
    try {

      const existingSchedule = await this.prismaService.doctorSchedule.findUnique({
        where: {
          id: id,

        },
        include:{
          doctorId:true,
          serviceId:true
        }
      });

      if (!existingSchedule) {
        throw new BadRequestException('Schedule doesnot exists');
      }

      return existingSchedule;
    } catch (error) {
      throw error
    }
  }
  async findOneByDoctorAndWeekday(doctorId: string, weekday: Weekdays) {
    try {

      const existingSchedule = await this.prismaService.doctorSchedule.findMany({
        where: {
          doctor: doctorId,
          weekday: weekday
        },
        include:{
          doctorId:true,
          serviceId:true
        }
      });

      if (!existingSchedule) {
        throw new BadRequestException('Schedule doesnot exists');
      }

      return existingSchedule;
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    try {
      const previousSchedule = await this.findOneScheduleById(id)
      

      const normalisedStartTime = await this.replaceDatePartWithDefaultDate(updateScheduleDto.startTime.toISOString())
      const normalisedEndTime = await this.replaceDatePartWithDefaultDate(updateScheduleDto.endTime.toISOString())

      console.log(normalisedStartTime, normalisedEndTime);
      console.log(normalisedStartTime.getHours())

      await this.checkTimeSlotOverlap(previousSchedule.doctor, previousSchedule.scheduleDate, normalisedStartTime, normalisedEndTime , previousSchedule.id)
      const updateSchedule = await this.prismaService.doctorSchedule.update({
        where: {
          id: id
        },
        data: {
          startTime: normalisedStartTime,
          endTime: normalisedEndTime,
          slotDuration: updateScheduleDto.slotDuration
        }
      })

      return updateSchedule;

    } catch (error) {
      throw error
    }

  }

  async remove(id: string) {
    try {
      await this.findOneScheduleById(id)

      const updateSchedule = await this.prismaService.doctorSchedule.delete({
        where: {
          id: id
        },

      })

      return { message: "Schedule Deleted" };

    } catch (error) {
      throw error
    }

  }
  async findAllDoctorsOfAService(serviceId: string) {
    try {
      const isService = await this.prismaService.service.findUnique({
        where: {
          id: serviceId
        }
      })
      if (!isService) {
        throw new BadRequestException("Service not found")
      }

      const schedules = await this.prismaService.doctorSchedule.findMany({
        where: {
          service: serviceId
        },
        // select:{
        //   doctor:true,
        //   service:true,
        //   weekday:true,
        // serviceId:{
        //   select:{
        //     id:true,
        //     name:true,
        //     description:true
        //   }
        // },
        // doctorId:{
        //   select:{
        //     id:true,
        //     profilePic:true,
        //     name:true,
        //     email:true,
        //     contactNumber:true
        //   }
        // }
        //}
        include: {
          serviceId: true,
          doctorId: true
        }
      })

      const doctorIds = schedules.map(item => item.doctorId);
      const uniqueDoctorIds = [...new Set(schedules.map(item => item.doctorId.id))];

      const doctors = await this.prismaService.doctor.findMany({
        where: {
          id: {
            in: doctorIds.map(doctor => doctor.id)
          }
        }
      });

      const uniqueDoctorsdata = [];

      doctors.forEach(doctor => {
        if (!uniqueDoctorsdata.some(d => d.id === doctor.id)) {
          uniqueDoctorsdata.push(doctor);
        }
      });
      return uniqueDoctorsdata;
    } catch (error) {
      throw error
    }
  }

  // create slots in a schedule. slot duration, daystart and endtime from schedule
  async calculateSlotsInASchedule(scheduleId: string) {

    const scheduleData = await this.findOneScheduleById(scheduleId)
    //startTime, endTime,
    const slotDuration = scheduleData.slotDuration
    // const start = new Date(scheduleData.startTime);
    // const end = new Date(scheduleData.endTime);

    // console.log(' \n start and end Khalis : ' , start , '    ',end)

    // console.log(' \n start : ' , start)
    // console.log(' \n endtime : ' , end)
    const totalDuration = (scheduleData.endTime.getTime() - scheduleData.startTime.getTime()) / (1000 * 60); // Convert milliseconds to minutes
    console.log(' \n total duration : ', totalDuration)
    console.log(' \n get time  : ', scheduleData.startTime.getTime())
    console.log(' \n get time  : ', scheduleData.endTime.getTime())

    // number of slots according to duratrion and slots
    const numberOfSlots = Math.floor(totalDuration / slotDuration);
    console.log(' \n number of slots : ', numberOfSlots)

    const slots = []; // for storing calculated slots
    for (let i = 0; i < numberOfSlots; i++) {
      const slotStartTime = new Date(scheduleData.startTime.getTime() + (slotDuration * 60000 * i)); // Convert to ms and then  use iteration for next slot

      slots.push(slotStartTime); // Convert to ISO string for database compatibility if needed to store in our usage. // slots.push(slotStartTime.toISOString())
    }

    return slots;
  }

  //   async  calculateSlotsInSchedule(schedule) {
  //     const { startTime, endTime, slotDuration } = schedule;
  //     const startDateTime = new Date(startTime);
  //     const endDateTime = new Date(endTime);
  //     const slots: number[] = [];

  //     let currentSlot = startDateTime;

  //     while (currentSlot < endDateTime) {
  //         slots.push(currentSlot.getTime()); // Store the slot as timestamp
  //         currentSlot = new Date(currentSlot.getTime() + slotDuration * 60000); // Add slot duration in milliseconds
  //     }

  //     return slots;
  // }

  async calculateSlotsInSchedule(schedule) {
    const { startTime, endTime, slotDuration } = schedule;
    const slots = [];
    let currentSlot = startTime.getTime();

    while (currentSlot < endTime.getTime()) {
      slots.push(currentSlot);
      currentSlot += slotDuration * 60000; // Add slot duration in milliseconds
    }

    return slots;
  }

  async calculateSlotsInSchedules(schedules) {
    const allSlots = [];
    schedules.forEach(async schedule => {
      const slotsInSchedule = this.calculateSlotsInSchedule(schedule);
      allSlots.push(...await slotsInSchedule);
    });
    return allSlots;
  }

  async availableTimeSlotsOfDoctor(doctorId: string, time: Date) {
    try {

    } catch (error) {
      throw error
    }

  }

  checkDayFromTime(weekday: string, startTime: Date, endTime: Date) {

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfStartTime = weekdays[startTime.getDay()];
    const dayOfEndTime = weekdays[endTime.getDay()];

    if (weekday !== dayOfStartTime || weekday !== dayOfEndTime) {
      throw new ConflictException("Weekday and Time are in conflict")
    }
    return;
  }

  async checkTimeSlotOverlap(doctorId: string, scheduleDate: Date, startTime: Date, endTime: Date , slotIdToUpdate?: string) {
    const existingSchedules = await this.prismaService.doctorSchedule.findMany({
      where: {
        doctor: doctorId,
        scheduleDate: scheduleDate,
        AND: [
          {
            id: {
                not: slotIdToUpdate, // Exclude the slot being updated
            },
        },
          {
            OR: [
              {
                startTime: {
                  lt: startTime,
                },
                endTime: {
                  gt: startTime,
                },
              },
              {
                startTime: {
                  lt: endTime,
                },
                endTime: {
                  gt: endTime,
                },
              },
              {
                startTime: {
                  gt: startTime,
                },
                endTime: {
                  lt: endTime,
                },
              },
              {
                startTime: {
                  lt: endTime,
                },
                endTime: {
                  gt: startTime,
                },
              },
            ],
          },
        ],
      },
    });


    if (existingSchedules.length > 0) {
      throw new BadRequestException('Time slot overlaps with existing schedule');
    }
  }


  async normalizeTimeToDate(date: Date) {
    const defaultDate: Date = new Date("2020-01-01T00:00:00.000Z")
    console.log(date, "\n");
    console.log(date.getHours())
    console.log(defaultDate.getHours())


    // return new Date(defaultDate.getFullYear(), defaultDate.getMonth(), defaultDate.getDate(),
    //   date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      defaultDate.getUTCHours(),
      defaultDate.getUTCMinutes(),
      defaultDate.getUTCSeconds(),
      defaultDate.getUTCMilliseconds()
    );
  }

  async replaceDatePartWithDefaultDate(dateString: string) {
    const defaultDate = "2024-03-04T00:00:00.000Z";

    const defaultDateTime = new Date(defaultDate);
    const providedDateTime = new Date(dateString);

    const hours = providedDateTime.getHours();
    const minutes = providedDateTime.getMinutes();
    const seconds = providedDateTime.getSeconds();
    const milliseconds = providedDateTime.getMilliseconds();

    // Create a new Date object using the time components from the provided date
    // and the date part from the default date
    const newDate = new Date(
      defaultDateTime.getFullYear(),
      defaultDateTime.getMonth(),
      defaultDateTime.getDate(),
      hours,
      minutes,
      seconds,
      milliseconds
    );

    return newDate;
  }

  categorizeTimeSlot(startTime: Date, endTime: Date): string {
    const startHour = startTime.getHours();
    const endHour = endTime.getHours();

    console.log(startHour, endHour);


    // Check if start time and end time are within valid ranges
    if (startHour >= 6 && startHour < 12 && endHour > 6 && endHour <= 12) {
      return 'morning';
    } else if (startHour >= 12 && startHour < 18 && endHour > 12 && endHour <= 18) {
      return 'afternoon';
    } else if (startHour >= 18 && startHour < 24 && endHour > 18 && endHour <= 24) {
      return 'evening';
    } else if ((startHour >= 0 && startHour < 6 || endHour > 0 && endHour <= 6)) {
      return 'night';
    } else {
      throw new BadRequestException('Invalid time slot. Please provide a valid time slot within morning, afternoon, evening, or night.');
    }
  }

  setTimeToMidnight(dateInstance) { //convert the time in  date part to be 00000000 for consisitency 
    const modifiedDate = new Date(dateInstance);

    // Set the hours, minutes, seconds, and milliseconds to zero
    modifiedDate.setUTCHours(0, 0, 0, 0);

    // Return the modified date
    return modifiedDate;

  }

}