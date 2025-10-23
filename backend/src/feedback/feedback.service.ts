import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { AppointmentService } from 'src/appointment/appointment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Doctor } from '@prisma/client';
import { DoctorService } from 'src/doctor/doctor.service';

@Injectable()
export class FeedbackService {
  constructor(
    private  prismaService : PrismaService,
    private  appointmentService : AppointmentService,
    private  doctorService : DoctorService

  ){}
  async create(createFeedbackDto: CreateFeedbackDto) {
    try {

      const appointment = await this.appointmentService.findOne(createFeedbackDto.appointment)
      const isPreviousFeedback = await this.findFeedbackByAppointment(createFeedbackDto.appointment)
      if(isPreviousFeedback){
        throw new NotAcceptableException("User has already provided feedback")
      }
      const feedback = await this.prismaService.appointmentReviews.create({
        data:{
          appointment:appointment.id,
          review : createFeedbackDto.review
        }
      })

      const getDoctor = await this.doctorService.findOneDoctorById(appointment.doctor)
      const review  = this.calculateDoctorReview(getDoctor.patientReviews , getDoctor.reviewCount , createFeedbackDto.review)
      const doctorReview = await this.prismaService.doctor.update({
        where:{
          id:appointment.doctor
        },
        data:{
          patientReviews:review,
          reviewCount:{increment:1}
        }
      })
      if(createFeedbackDto.review<3){

        // send email to admin
      }

      return {message :"Thank You for Providing Feedback"}
      
    } catch (error) {
      throw error
    }
  }

  async findFeedbackByAppointment(appointmentId: string) {
    try {
      return await this.prismaService.appointmentReviews.findUnique({
        where:{
          appointment:appointmentId
        }
      })
      
    } catch (error) {
      throw error
    }
  }

  calculateDoctorReview(previousReview : number , reviewCount:number, review:number){
    const totalSum = previousReview+review
    return totalSum/(reviewCount+1)

  }
}
