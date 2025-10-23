import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { generateRandom4DigitNumber, isEmailOrPhoneNumber } from './utility.functions';
import { Role } from '@prisma/client';

@Injectable()
export class VerifyService {
    constructor(private readonly prismaService: PrismaService
        ) { }


    async generateAndStoreOTP(username: string, userRole: Role)//: Promise<number> 
    {

        try {
            const previousUser = await this.prismaService.verifyUser.findUnique({ // check if user is already in db, if yes then delete the entry
                where:{
                    username:username
                }
            })
            if(previousUser){
                await this.prismaService.verifyUser.delete({
                    where:{
                        id : previousUser.id
                    }
                })
            }
            // Generate a random 4-digit number
            const randomNumber = generateRandom4DigitNumber()
            //check if username is email or phone
            const usernameType = isEmailOrPhoneNumber(username)
            const userToVerify = await this.prismaService.
                verifyUser.create({
                    data: {
                        username: username,
                        otp: randomNumber,
                        usernameType: usernameType,
                        type: userRole

                    }
                })
            return userToVerify;
        } catch (error) {
            throw new Error(`Failed to generate and store random number: ${error.message}`);
        }
    }

    async verifyOTP(username: string, otp: string): Promise<object> {
        try {
            const usernameType = isEmailOrPhoneNumber(username) // check the username passed is either email or phone
            console.log(usernameType);
            
            const userToVerify = await this.prismaService.verifyUser.findFirst({
                where: {
                    username: username,
                    usernameType: usernameType
                },
            });

            if (!userToVerify) {
                throw new BadRequestException(`User with username : ${username} doesnot exists for verification`)
            }
            if (userToVerify.verificationTries >= 3) {
                await this.prismaService.verifyUser.delete({ 
                    where:{
                        username:userToVerify.username
                    }
                })
                throw new NotAcceptableException(`To many tries`)

            }
            // Check if the OTP record was created within the last 5 minutes
            const createdAt = new Date(userToVerify.createdAt).getTime();
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - createdAt;
            const fiveMinutesInMilliseconds = 200 * 60 * 1000; //chnage this 2000 to 5

            if (timeDifference > fiveMinutesInMilliseconds) {
                await this.prismaService.verifyUser.delete({ 
                    where:{
                        username:userToVerify.username
                    }
                })
                // If the OTP record is older than 5 minutes,throw error
                throw new BadRequestException(`OTP expired for username : ${username}`)
            }

            if (userToVerify.otp !== otp) {
                await this.prismaService.verifyUser.update({
                    where: {
                        id: userToVerify.id
                    },
                    data: {
                        verificationTries: { increment: 1 }
                    }
                })
                throw new BadRequestException(`OTP enterned is incorrect`)
            }

            if (userToVerify.type === 'Patient') {
                const verifyUsername = await this.prismaService.patient.update({
                    where: {
                        email: userToVerify.username
                    },
                    data: {
                        is_emailVerified: true
                    }
                })
                await this.prismaService.verifyUser.delete({ 
                    where:{
                        username:userToVerify.username
                    }
                })
                return verifyUsername;
                //return { message: `User ${username} verified.` };
            }

            // If the OTP is valid and within the time limit
            //return { message: `User ${username} verified. Please use ${username} for login` };
        //     const token = await this.auth.generateToken(userToVerify.id, 'Patient')
          
        //   return {access_token :token};
        } catch (error) {
            throw error
        }
    }

}
