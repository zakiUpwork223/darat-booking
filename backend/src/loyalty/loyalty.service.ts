import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';

import { RequestUser } from 'src/auth/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
//import { PaymentService } from 'src/payment/payment.service';
import { UpdateUserRewardsDto } from './dto/update-user-rewards.dto';
import { PatientService } from 'src/patient/patient.service';

@Injectable()
export class LoyaltyService {
  constructor(
    private prismaService: PrismaService,
    private patientService: PatientService,
    //private paymentService: PaymentService
  ) { }
  //async createPoints(createLoyaltyDto: CreateLoyaltyDto, user: RequestUser)
  async createPoints(amount: number, user) {
    try {
      // const checkPayment = this.paymentService.retrievePaymentIntent(createLoyaltyDto.client_secret) // check status
      // console.log("checkPayment Intent in loyalty service : ", checkPayment);
      const payedAmount = amount / 100
      const loyaltyPoints = this.calculateLoyaltyPoints(payedAmount) // retrieve from payment intent.

      const previousUser = await this.prismaService.loyalty.findUnique({
        where: {
          patient: user.patient
        }
      })
      if (previousUser) {
        const updatePoints = await this.prismaService.loyalty.update({ // if user already exists then update the loyalty points
          where: {
            id: previousUser.id
          },
          data: {
            points: { "increment": loyaltyPoints }
          }
        })

        return updatePoints
      }
      const userLoyalty = await this.prismaService.loyalty.create({
        data: {
          patient: user.patient,
          points: loyaltyPoints
        }
      })

      return userLoyalty

    } catch (error) {
      throw error
    }
  }

  async getUserPoints(user: RequestUser) {
    try {
      const userPoints = await this.prismaService.loyalty.findUnique({
        where: {
          patient: user.id
        }
      })
      if (!userPoints) {
        return { points: 0 }
      }
      return userPoints

    } catch (error) { throw error }
  }

  async redeemPoints(packageType: string, user: RequestUser) {
    try {
      const userPoints = await this.prismaService.loyalty.findUnique({
        where: {
          patient: user.id
        }
      })
      if (!userPoints) {
        throw new BadRequestException("User doesnot have any points")
      }

      if (userPoints.points < 500) {
        throw new BadRequestException("Insufficient Points")
      }

      // const silver = 500
      // const gold = 1000
      // const platinum = 1000 // more than 1000

      let deductionAmount: number;
      switch (packageType) {
        case "Silver":
          deductionAmount = 500;
          break;
        case "Gold":
          if (userPoints.points < 1000) {
            throw new BadRequestException("Insufficient Points")
          }
          deductionAmount = 1000;
          break;
        case "Platinum":
          if (userPoints.points <= 1000) {
            throw new BadRequestException("Insufficient Points")
          }
          deductionAmount = userPoints.points; // More than 1000
          break;
        default:
          throw new BadRequestException("Invalid packageType");
      }

      // Deduct points from userPoints
      const updatedPoints = userPoints.points - deductionAmount;

      // Update userPoints in the database
      const remainingPoints = await this.prismaService.loyalty.update({
        where: {
          patient: user.id
        },
        data: {
          points: updatedPoints
        }
      });

      this.createPackage(packageType, user)

      return remainingPoints

    } catch (error) {
      throw error
    }

  }

  async createPackage(packageSelected: string, user: RequestUser) {
    try {

      switch (packageSelected) {
        case 'Silver': {

          const previousUser = await this.prismaService.loyaltyPackage.findUnique({
            where: {
              patient: user.id
            }
          });
          if (previousUser) {
            const updatedPackage = await this.prismaService.loyaltyPackage.update({
              where: {
                id: previousUser.id
              },
              data: {
                loyaltyType: "Silver",
                birthday: {
                  freeFacial: (previousUser.birthday as { freeFacial?: number } | null)?.freeFacial + 1 || 1,
                  freeMask: (previousUser.birthday as { freeFacial?: number } | null)?.freeFacial
                },
                freeGift: {
                  maskSheet: (previousUser.freeGift as { maskSheet?: number } | null)?.maskSheet + 1 || 1,
                  cream: (previousUser.freeGift as { maskSheet?: number } | null)?.maskSheet,
                  sunblock: (previousUser.freeGift as { maskSheet?: number } | null)?.maskSheet,
                },
                consultation: (previousUser.consultation as number | null) + 1 || 1,
                serviceDiscount: (previousUser.serviceDiscount as number | null),
                freeServices: {
                  bodyLaser: (previousUser.freeServices as { bodyLaser?: number } | null)?.bodyLaser,
                  teethCleaning: (previousUser.freeServices as { teethCleaning?: number } | null)?.teethCleaning,
                  cooltechSession: (previousUser.freeServices as { cooltechSession?: number } | null)?.cooltechSession
                }
              }
            })
            return updatedPackage
          } else {
            const createdPackage = await this.prismaService.loyaltyPackage.create({
              data: {
                patient: user.id,
                loyaltyType: "Silver",
                birthday: {
                  freeFacial: 1,
                  freeMask: 0
                },
                freeGift: {
                  maskSheet: 1,
                  cream: 0,
                  sunblock: 0
                },
                consultation: 1,
                serviceDiscount: 0,
                freeServices: {
                  bodyLaser: 0,
                  teethCleaning: 0,
                  cooltechSession: 0
                }
              }
            })
            return createdPackage
          }

        }

        case 'Gold': {
          const previousUser = await this.prismaService.loyaltyPackage.findUnique({
            where: {
              patient: user.id
            }
          });
          if (previousUser) {
            const updatedPackage = await this.prismaService.loyaltyPackage.update({
              where: {
                id: previousUser.id
              },
              data: {
                loyaltyType: "Gold",
                birthday: {
                  freeFacial: (previousUser.birthday as { freeFacial?: number } | null)?.freeFacial + 1 || 1,
                  freeMask: (previousUser.birthday as { freeMask?: number } | null)?.freeMask + 1 || 1,
                  sunblock: (previousUser.freeGift as { maskSheet?: number } | null)?.maskSheet
                },
                freeGift: {
                  maskSheet: (previousUser.freeGift as { maskSheet?: number } | null)?.maskSheet + 1 || 1,
                  cream: (previousUser.freeGift as { cream?: number } | null)?.cream + 1 || 1
                },
                consultation: (previousUser.consultation as number | null) + 1 || 1,
                serviceDiscount: (previousUser.serviceDiscount as number | null) + 1 || 1,
                freeServices: {
                  bodyLaser: (previousUser.freeServices as { bodyLaser?: number } | null)?.bodyLaser,
                  teethCleaning: (previousUser.freeServices as { teethCleaning?: number } | null)?.teethCleaning,
                  cooltechSession: (previousUser.freeServices as { cooltechSession?: number } | null)?.cooltechSession
                }
              }
            })
            return updatedPackage
          } else {
            const createdPackage = await this.prismaService.loyaltyPackage.create({
              data: {
                patient: user.id,
                loyaltyType: "Gold",
                birthday: {
                  freeFacial: 1,
                  freeMask: 1
                },
                freeGift: {
                  maskSheet: 1,
                  cream: 1,
                  sunblock: 0
                },
                consultation: 1,
                serviceDiscount: 1,
                freeServices: {
                  bodyLaser: 0,
                  teethCleaning: 0,
                  cooltechSession: 0
                }
              }
            })
            return createdPackage
          }
        }
        case 'Platinum': {
          const previousUser = await this.prismaService.loyaltyPackage.findUnique({
            where: {
              patient: user.id
            }
          });
          if (previousUser) {
            const updatedPackage = await this.prismaService.loyaltyPackage.update({
              where: {
                id: previousUser.id
              },
              data: {
                loyaltyType: "Platinum",
                birthday: {
                  freeFacial: (previousUser.birthday as { freeFacial?: number } | null)?.freeFacial + 1 || 1,
                  freeMask: (previousUser.birthday as { freeMask?: number } | null)?.freeMask + 1 || 1
                },
                freeGift: {
                  maskSheet: (previousUser.freeGift as { maskSheet?: number } | null)?.maskSheet + 1 || 1,
                  cream: (previousUser.freeGift as { cream?: number } | null)?.cream + 1 || 1,
                  sunblock: (previousUser.freeGift as { sunblock?: number } | null)?.sunblock + 1 || 1
                },
                consultation: (previousUser.consultation as number | null) + 2 || 1,
                serviceDiscount: (previousUser.serviceDiscount as number | null) + 1 || 1,
                freeServices: {
                  bodyLaser: (previousUser.freeServices as { bodyLaser?: number } | null)?.bodyLaser + 1 || 1,
                  teethCleaning: (previousUser.freeServices as { teethCleaning?: number } | null)?.teethCleaning + 1 || 1,
                  cooltechSession: (previousUser.freeServices as { cooltechSession?: number } | null)?.cooltechSession + 1 || 1,
                }
              }
            })
            return updatedPackage
          } else {
            const createdPackage = await this.prismaService.loyaltyPackage.create({
              data: {
                patient: user.id,
                loyaltyType: "Platinum",
                birthday: {
                  freeFacial: 1,
                  freeMask: 1
                },
                freeGift: {
                  maskSheet: 1,
                  cream: 1,
                  sunblock: 1
                },
                consultation: 2,
                serviceDiscount: 1,
                freeServices: {
                  bodyLaser: 1,
                  teethCleaning: 1,
                  cooltechSession: 1
                }
              }
            })
            return createdPackage
          }
        }
      }



    } catch (error) {
      throw new InternalServerErrorException(`Error occured while creating package ${error.message}`)
    }
  }

  calculateLoyaltyPoints(amount: number): number {
    const pointsPerSAR = 0.1;
    const loyaltyPoints = Math.floor(amount * pointsPerSAR);
    return loyaltyPoints;
  }


  async getUserLoyaltyPackage(userEmail: string, user: RequestUser) {
    try {
      let userPackage
      if (user.role === "Patient") {
        userPackage = await this.prismaService.loyaltyPackage.findUnique({
          where: {
            patient: user.id
          }
        })
      } else {
        if (!userEmail) {
          throw new BadRequestException("Provide email of user")
        }
        const user = await this.patientService.findOnePatientByEmail(userEmail)
        userPackage = await this.prismaService.loyaltyPackage.findUnique({
          where: {
            patient: user.id
          }
        })
      }
      if (!userPackage) {
        return { message: "User doesn't have any Loyalty Package" }
      }

      return userPackage

    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`)
    }
  }


  async getAllLoyaltyPackages(){
   
      return await this.prismaService.loyaltyPackage.findMany({
        include:{
          patientId:{
            select:{
              id:true,
              name:true,
              profilePic:true,
              email:true,
              contactNumber:true
            }
          }
        }
      })
      
   

  }

  async updateUserRewards(updateUserRewardsDto: UpdateUserRewardsDto) { // make a dto for this data to be updated
    try {
      const { patientEmail, ...restDto } = updateUserRewardsDto

      const user = await this.patientService.findOnePatientByEmail(patientEmail)

      const allZeroValues = Object.values(restDto).every(value => {
        if (typeof value === 'object' && value !== null) {
          return Object.values(value).every(subValue => subValue === 0);
        } else {
          return value === 0;
        }
      });
    if (allZeroValues) {
      await this.prismaService.loyaltyPackage.delete({
        where:{
          patient: user.id
        }
      }); 

      return {message : "All Rewards are given to the Customer. Customer Plan has ended"}; // Return false indicating entry was deleted
    }
      const updateRewards = await this.prismaService.loyaltyPackage.update({
        where: {
          patient: user.id
        },
        data: {
          birthday: { ...restDto.birthday },
          freeGift: { ...restDto.freeGift },
          consultation: restDto.consultation,
          serviceDiscount: restDto.serviceDiscount,
          freeServices: { ...restDto.freeServices }
        }
      })

      return updateRewards;

    } catch (error) {
      throw new InternalServerErrorException(`Error occured while updaing user loyalty ${error.message}`)
    }
  }

}
