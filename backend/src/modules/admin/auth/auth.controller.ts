// import { Controller, Post, Body, Res } from '@nestjs/common';
// import { Response } from 'express';

// import { AuthService } from './auth.service';
// import {
//   ChangePasswordDto,
//   LoginDto,
//   RegisterDto,
//   VerifyAccountDto,
//   forgotPasswordDto,
// } from './dto/auth.request';
// import { PostgreStatusCode } from 'src/common/enums/enums';
// import { User } from 'src/entities/user.entity';
// import { AdminAuth } from './endpoints';
// import { UserResponseDto, VerifyAccountResponseDto } from './dto/auth.response';
// import { ApiTags } from '@nestjs/swagger';
// import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';

// @ApiTags('Auth')
// @ApiResponseTags()
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post(AdminAuth.register)
//   async register(@Res() response: Response, @Body() body: RegisterDto) {
//     try {
//       const data: User = await this.authService.create(body);
//       response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
//     } catch (error) {
//       response
//         .status(PostgreStatusCode.AUTHORIZATION_ERROR)
//         .send({ error: true, message: error });
//     }
//   }

//   @Post(AdminAuth.login)
//   async login(@Res() response: Response, @Body() body: LoginDto) {
//     try {
//       const data: UserResponseDto = await this.authService.login(body);
//       response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
//     } catch (error) {
//       response
//         .status(PostgreStatusCode.AUTHORIZATION_ERROR)
//         .send({ error: true, message: error });
//     }
//   }

//   @Post(AdminAuth.verifyAccount)
//   async verifyAccount(
//     @Res() response: Response,
//     @Body() body: VerifyAccountDto,
//   ) {
//     try {
//       const data: VerifyAccountResponseDto =
//         await this.authService.verifyAccount(body);
//       response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
//     } catch (error) {
//       response
//         .status(PostgreStatusCode.AUTHORIZATION_ERROR)
//         .send({ error: true, message: error });
//     }
//   }

//   @Post(AdminAuth.forgotPassword)
//   async forgotPassword(
//     @Res() response: Response,
//     @Body() body: forgotPasswordDto,
//   ) {
//     try {
//       const data: User = await this.authService.forgotPassword(body);
//       response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
//     } catch (error) {
//       response
//         .status(PostgreStatusCode.AUTHORIZATION_ERROR)
//         .send({ error: true, message: error });
//     }
//   }

//   @Post(AdminAuth.verifyOtp)
//   async verifyOtp(@Res() response: Response, @Body() body: VerifyAccountDto) {
//     try {
//       const data: VerifyAccountResponseDto =
//         await this.authService.verifyOtp(body);
//       response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
//     } catch (error) {
//       response
//         .status(PostgreStatusCode.AUTHORIZATION_ERROR)
//         .send({ error: true, message: error });
//     }
//   }

//   @Post(AdminAuth.verifyOtp)
//   async changePassword(
//     @Res() response: Response,
//     @Body() body: ChangePasswordDto,
//   ) {
//     try {
//       const data: VerifyAccountResponseDto =
//         await this.authService.changePassword(body);
//       response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
//     } catch (error) {
//       response
//         .status(PostgreStatusCode.AUTHORIZATION_ERROR)
//         .send({ error: true, message: error });
//     }
//   }
// }
