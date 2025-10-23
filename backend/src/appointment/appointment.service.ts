import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { BookedAppointmentDto } from './dto/booked-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScheduleService } from 'src/schedule/dr_schedule.service';
import { Prisma, Weekdays } from '@prisma/client';
import { LoyaltyService } from 'src/loyalty/loyalty.service';
import { RequestUser } from 'src/auth/entities/user.entity';
import { WebsocketGateway } from 'src/sockets/websocket.gateway';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AppointmentService {
  constructor(
    private prismaService: PrismaService,
    private scheduleService: ScheduleService,
    private loyaltyService: LoyaltyService,
    private socketService: WebsocketGateway,
    private mailService: MailerService
  ) {
  }
  async checkBookingSlotAndData(createAppointmentDto: CreateAppointmentDto) {
    try {
      const service = await this.prismaService.service.findUnique({
        where: {
          id: createAppointmentDto.serviceId
        }
      })
      if (!service) {
        throw new NotFoundException("service not found")
      }
      const doctor = await this.prismaService.doctor.findUnique({
        where: {
          id: createAppointmentDto.doctorId
        }
      })
      if (!doctor) {
        throw new NotFoundException("doctor not found")
      }

      await this.isSlotBooked(doctor.id, service.id, createAppointmentDto.scheduldedDate)
      const scheduldedDate = createAppointmentDto.scheduldedDate.toISOString().split('T')[0]
      const startTime = createAppointmentDto.scheduldedDate.toISOString()

      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const day = weekdays[createAppointmentDto.scheduldedDate.getDay()];


    const data = {
      doctorId: doctor.id,
      doctorName:doctor.name,
      service:service.id,
      scheduldedDate:scheduldedDate,
      day:day,
      startTime:startTime
    }
      return data

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException(
          `Booking already exists : ${error.message}`, // @Todo remove error .message to send proper info!!!
        );
      }
      throw error
    }
  }
  
  async createBooking(payload ,  user ){
    try { 
      console.log("payload : ", payload);
      console.log("user : " , user);
      
      
      const appointmentCreated = await this.prismaService.appointment.create({
        data: {
          patient: user,
          doctor: payload.doctorId,
          service: payload.service,
          scheduledDate: payload.scheduldedDate,
          weekday: payload.day,
          startTime: payload.startTime,

          status: "Confirmed",
          endTime: new Date

        }
      }) //store payment and connect with payment table
      console.log("\n\n appointmentCreated : " , appointmentCreated)

      // const storePayment = await this.prismaService.customerPaymentsRecord.update({
      //   where:{
      //     client_secret:payload.client_secret
      //   },
      //   data:{
      //     appointment:appointmentCreated.id
      //   }
      // })

      const scheduledDate = new Date(payload.scheduledDate);
      //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' };
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long', // or 'short' or 'narrow'
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
    };
      const formattedDate = scheduledDate.toLocaleString('en-US', options);

      console.log(formattedDate);
      
      //@todo. here adjust loyalty
      // const patientPoints = await this.loyaltyService.createPoints(storePayment.paymentAmount, user)
      //await this.socketService.appointmentStatus(user, `Your Appointment is Booked with Doctor ${payload.doctorName} on ${formattedDate} `) //add date and details etc
      await this.socketService.appointmentStatus(user, `Your Appointment is Booked with Doctor ${payload.doctorName}`) //add date and details etc

      const body = `Your appointment is booked :` //update this body
      await this.mailService.sendEmail(user, "Appointment Confirmation", body)
      return appointmentCreated
      
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw error
    }

  }




  async findAllApointments(user: RequestUser) {
    try {
      return await this.prismaService.appointment.findMany({
        where: {
          patient: user.id
        },
        include:{
          patientId:true,
          doctorId:true,
          serviceId:true
        }
      })

    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`)
    }
  }

  async findAllApointmentsofDoctor(user: RequestUser, scheduledDate: string, status: string) {
    //return await this.prismaService.appointment.findMany()
    try {

      let where: any = {
        doctor: user.id,
      };
      if (!scheduledDate && !status) {
        return this.prismaService.appointment.findMany({ where });
      }

      if (scheduledDate) {
        where = {
          ...where,
          scheduledDate,
        };
      }
      if (status) {
        where = {
          ...where,
          status,
        };
      }

      if (scheduledDate && status) {
        where = {
          scheduledDate,
          status
        };
      }

      return await this.prismaService.appointment.findMany({
        where
      })

    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`)
    }
  }

  async findOne(id: string) {
    try {
      const appointment = await this.prismaService.appointment.findUnique({
        where: {
          id: id
        }
      })
      if (!appointment) {
        throw new NotFoundException("Appointmnet doesnot exists")
      }
      return appointment;
    } catch (error) {
      throw error
    }
  }

  async cancelAppointment(appointmentId: string, user: RequestUser) {
    try {
      const appointment = await this.findOne(appointmentId)
      if (appointment.patient !== user.id) {
        throw new NotAcceptableException("User can only cancel their own appointments")
      }

      const updateStatus = await this.prismaService.appointment.update({ // should we delete the entry or should we just mark it as inactive. Also Refund amount and deduction should be hw much
        where: {
          id: appointmentId
        },
        data: {
          status: "Cancelled"
        },
        include: {
          doctorId: true
        }
      })

      this.socketService.appointmentStatus(user.id, `Appointment Cancelled with Doctor ${updateStatus.doctorId.name} `) //add date and details etc

      const body = `Your appointment is Cancelled` //update this body
      this.mailService.sendEmail(user.id, "Appointment Cancelled", body)

      return { message: "Appointment Cancelled" }

    } catch (error) {
      throw error
    }
  }

  async rescheduleAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto , user:RequestUser) {
    try {
      const previousAppointment  = await this.findOne(id)

      if(previousAppointment.patient !== user.id){
        throw new NotAcceptableException("User can only reschedule their appointments")
      }
      const checkPayload:CreateAppointmentDto = {
        doctorId:previousAppointment.doctor,
        serviceId:previousAppointment.service,
        scheduldedDate:updateAppointmentDto.scheduldedDate
      }
      const availableSlotData = await this.checkBookingSlotAndData(checkPayload)

      const updateAppointment = await this.prismaService.appointment.update({
        where:{
          id:previousAppointment.id
        },
        data:{
          scheduledDate: availableSlotData.scheduldedDate,
          weekday: availableSlotData.day,
          startTime: availableSlotData.startTime,
        }
      })

      this.socketService.appointmentStatus(user.id, `Appointment Rescheduled`) //add date and details etc

      return updateAppointment;
    } catch (error) {
      throw error
    }
  }

  async doctorAppointments(bookedAppointmentDto: BookedAppointmentDto) {
    try {

      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const day = weekdays[bookedAppointmentDto.dateSelected.getDay()];
      const dayString = bookedAppointmentDto.dateSelected.getDay();
      const dayEnum = this.stringToEnum(day, Weekdays);

      console.log("day", dayEnum)
      const doctor = await this.prismaService.doctor.findUnique({
        where: {
          id: bookedAppointmentDto.doctorId
        }
      })
      if (!doctor) {
        throw new NotFoundException("Doctor not found")
      }

      const schedule = await this.prismaService.doctorSchedule.findMany({
        where: {
          doctor: bookedAppointmentDto.doctorId,
          scheduleDate: bookedAppointmentDto.dateSelected
        }
      })
      if (!schedule) {
        return [];
      }
      const allSlots = this.scheduleService.calculateSlotsInSchedules(schedule)
      console.log(allSlots)

      const appointments = await this.prismaService.appointment.findMany({
        where: {
          doctor: bookedAppointmentDto.doctorId,
          weekday: day,
          scheduledDate: {
            equals: bookedAppointmentDto.dateSelected.toISOString().split('T')[0]
          }
        }
      });

      //console.log(appointments);

      const bookedSlots = appointments.map(appointment =>
        new Date(appointment.startTime)
      );

      console.log("booked slots : ", bookedSlots);
      console.log("all slots : ", allSlots)

      //const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

      const bookedSlotTimestamps = bookedSlots.map(slot => slot.getTime());
      console.log("bookedSlotTimestamps : ", bookedSlotTimestamps)
      //const availableSlots = allSlots.filter(slot => !bookedSlotTimestamps.includes(slot.getTime()));

      //   const availableSlots = allSlots.filter(slot => {
      //     // Convert the current slot to a timestamp
      //     const slotTimestamp = slot.getTime();
      //     // Check if the slot timestamp is not in the booked slot timestamps array
      //     return !bookedSlotTimestamps.includes(slotTimestamp);
      // });
      // Extract the time part from booked slots
      const bookedSlotTimes = bookedSlots.map(slot => slot.toISOString().slice(11, 16)); // Extracts HH:mm from the date string

      // Extract the time part from all slots
      //const allSlotTimes = (await allSlots).map(slot => slot.toISOString().slice(11, 16)); // Extracts HH:mm from the date string

      const allSlotTimes = (await allSlots).map(timestamp => new Date(timestamp).toISOString().slice(11, 16));

      // Filter out the available slots based on time
      const availableSlots = allSlotTimes.filter(slotTime => !bookedSlotTimes.includes(slotTime));

      console.log("Available slots:", availableSlots);


      // Extract the date part from the date sent in body of dto for extracting proper values
      const datePart = bookedAppointmentDto.dateSelected.toISOString().slice(0, 10); // Extracts yyyy-mm-dd from the date string

      // Combine the date part with the available slot times
      const availableSlotsWithDate = availableSlots.map(slotTime => `${datePart}T${slotTime}:00.000Z`);

      console.log("Available slots with date:", availableSlotsWithDate);

      return availableSlotsWithDate.sort()
      //return {"availableSlots"  : availableSlots  , "bookedSlots"  : bookedSlots , "slots" : allSlots}

    } catch (error) {
      throw error
    }
  }

  stringToEnum<T>(str: string, enumObj: T): T[keyof T] | undefined {
    return (enumObj as any)[str];
  }

  async isSlotBooked(doctorId: string, serviceId: string, scheduledDate: Date) {
    try {
      const alreadyBooked = await this.prismaService.appointment.findFirst({
        where: {
          doctor: doctorId,
          service: serviceId,
          startTime: scheduledDate,
          status: {
            not: "Cancelled" // Exclude appointments with status "Cancelled"
        }
        }
      })
      if (alreadyBooked) {
        throw new BadRequestException("Slot for this doctor is already booked")
      }

    } catch (error) {
      throw error
    }
  }

  async markAppointmentAsCompleted(id: string, user: RequestUser) { // SEND EMAIL and notification for feedback
    try {
      const appointment = await this.findOne(id) //check for handling time and donot let user mark it as done if time has not passed

      if (appointment.doctor !== user.id) {
        throw new NotAcceptableException("Doctor can only handle their appointments")
      }
      if (appointment.status === "Cancelled" || appointment.status === "Completed") {
        throw new NotAcceptableException("Appointment Status cannot be Updated")
      }

      const updateStatus = await this.prismaService.appointment.update({
        where: {
          id: id
        },
        data: {
          status: "Completed"
        }
      })
      const data = {
        message: "Appointment Completed with Doctor. Kindly fill out the feedback form",
        appointmentId: updateStatus.id
      }

      this.socketService.appointmentStatus(updateStatus.patient, data) //add date and details etc

      const body = `Your appointment is Completed ` //update this body
      this.mailService.sendEmail(updateStatus.patient, "Appointment Confirmation", body)

      return { message: `Appointment Marked as Completed` }

    } catch (error) {
      throw error
    }
  }

  async getAppointmentsForWeek(): Promise<any[]> {
    const today = new Date();
    const appointments = await this.prismaService.appointment.findMany({
      where: {
        scheduledDate: {
          gte: today.toISOString().split('T')[0],
          lte: this.getNextWeek(today).toISOString().split('T')[0],
        },
      },
    });

    const appointmentDates = Array.from({ length: 7 }, (_, i) => {
      const date = this.getDateFromOffset(today, i);
      const appointmentsOnDate = this.getAppointmentsOnDate(appointments, date);
      return {
        date: this.formatDate(date),
        day: this.getDayOfWeek(date),
        numAppointments: appointmentsOnDate.length,
      };
    });

    return appointmentDates;
  }

  private getNextWeek(date: Date): Date {
    const nextWeek = new Date(date);
    nextWeek.setDate(date.getDate() + 7);
    return nextWeek;
  }

  private getDateFromOffset(date: Date, offset: number): Date {
    const result = new Date(date);
    result.setDate(date.getDate() + offset);
    return result;
  }

  private getAppointmentsOnDate(appointments: any[], date: Date): any[] {
    return appointments.filter(appointment =>
      this.isSameDate(new Date(appointment.scheduledDate), date),
    );
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private getDayOfWeek(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

}
