// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { MailerService } from '@nestjs-modules/mailer';

// import * as jwt from 'jsonwebtoken';
// import * as bcrypt from 'bcryptjs';
// import { Repository } from 'typeorm';
// import ShortUniqueId from 'short-unique-id';

// import {
//   ChangePasswordDto,
//   LoginDto,
//   RegisterDto,
//   VerifyAccountDto,
//   forgotPasswordDto,
// } from './dto/auth.request';
// import { BaseService } from 'src/common/services/base-service';
// import { User } from 'src/entities/user.entity';
// import { UserResponseDto, VerifyAccountResponseDto } from './dto/auth.response';
// import { emailContent } from 'src/common/templates/email-templates';
// import { emailService } from 'src/common/utils/email-service';

// @Injectable()
// export class AuthService {
//   private userRep: BaseService<User>;
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//     private mailService: MailerService,
//   ) {
//     this.userRep = new BaseService<User>(this.userRepository, User.name);
//   }

//   async create(body: RegisterDto): Promise<User> {
//     const userExist = await this.userRep.findOne({
//       withDeleted: true,
//       where: { email: body.email },
//     });

//     if (userExist) {
//       throw 'User with this email already exists.';
//     } else {
//       const otpGenerator = new ShortUniqueId({ length: 6 });
//       const otp = otpGenerator.randomUUID(6);
//       Object.assign(body, { otp });
//       const content = emailContent(body);
//       const payload = this.userRepository.create(body);
//       const data: User = await this.userRep.save(payload);
//       if (data) {
//         emailService(this.mailService, body.email, content, 'Sign Up EMail ✔');
//         return data;
//       } else {
//         throw 'User not created';
//       }
//     }
//   }

//   async login(body: LoginDto): Promise<UserResponseDto> {
//     const data: User = await this.userRep.findOne({
//       select: [
//         'id',
//         'name',
//         'email',
//         'phone',
//         'password',
//         'role',
//         'deleted_at',
//         'is_verified',
//       ],
//       where: {
//         email: body.email,
//       },
//     });
//     if (data && !data.deleted_at && data.is_verified) {
//       const { id, name, email, phone, role } = data;
//       const authenticated = await bcrypt.compare(body.password, data.password);
//       if (authenticated) {
//         const user = {
//           id,
//           name,
//           email,
//           phone,
//           role,
//         };
//         const token = jwt.sign(user, process.env.JWT_SECRET, {
//           expiresIn: process.env.JWT_EXPIRATION_TIME,
//         });
//         await this.userRep.update(data.id, { otp: null });
//         return new UserResponseDto(id, name, email, phone, role, token);
//       } else {
//         throw 'Invalid Credentials!';
//       }
//     } else {
//       if (data && (data.deleted_at || !data.is_verified)) {
//         throw 'Your account isnt activated! Please activate your account';
//       } else {
//         throw 'Invalid Credentials! User not found.';
//       }
//     }
//   }

//   async verifyAccount(
//     body: VerifyAccountDto,
//   ): Promise<VerifyAccountResponseDto> {
//     const data: User = await this.userRep.findOne({
//       select: [
//         'id',
//         'name',
//         'email',
//         'phone',
//         'password',
//         'role',
//         'deleted_at',
//         'is_verified',
//         'otp',
//       ],
//       where: {
//         email: body.email,
//       },
//     });
//     if (data.is_verified) {
//       throw 'Account has already been verified';
//     }

//     if (data.otp === body.otp) {
//       return {
//         data,
//         message: 'Account Verified Successfully',
//       };
//     } else {
//       throw 'Invalid otp';
//     }
//   }

//   async forgotPassword(body: forgotPasswordDto): Promise<User> {
//     const data: User = await this.userRep.findOne({
//       select: [
//         'id',
//         'name',
//         'email',
//         'phone',
//         'password',
//         'role',
//         'deleted_at',
//         'is_verified',
//         'otp',
//       ],
//       where: {
//         email: body.email,
//       },
//     });

//     if (data) {
//       const otp = new ShortUniqueId({ length: 6 });
//       const payload = {
//         name: data.name,
//         otp,
//       };
//       await this.userRep.update(data.id, { otp });
//       const content = emailContent(payload);
//       emailService(
//         this.mailService,
//         body.email,
//         content,
//         'Forget Password EMail ✔',
//       );
//       return data;
//     } else {
//       throw 'User not found!';
//     }
//   }

//   async verifyOtp(body: VerifyAccountDto): Promise<VerifyAccountResponseDto> {
//     const data: User = await this.userRep.findOne({
//       select: [
//         'id',
//         'name',
//         'email',
//         'phone',
//         'password',
//         'role',
//         'deleted_at',
//         'is_verified',
//         'otp',
//       ],
//       where: {
//         email: body.email,
//       },
//     });

//     if (data.otp === body.otp) {
//       return {
//         data,
//         message: 'Otp Verification Successfully',
//         status: true,
//       };
//     } else {
//       throw 'Invalid otp';
//     }
//   }

//   async changePassword(
//     body: ChangePasswordDto,
//   ): Promise<VerifyAccountResponseDto> {
//     const data: User = await this.userRep.findOne({
//       select: [
//         'id',
//         'name',
//         'email',
//         'phone',
//         'password',
//         'role',
//         'deleted_at',
//         'is_verified',
//         'otp',
//       ],
//       where: {
//         email: body.email,
//       },
//     });

//     if (data) {
//       const newPassword = await bcrypt.hash(body.password, 10);
//       await this.userRep.update(data.id, { password: newPassword });
//       return {
//         data,
//         message: 'Password Updated Successfully',
//         status: true,
//       };
//     } else {
//       throw 'User not found!';
//     }
//   }
// }
