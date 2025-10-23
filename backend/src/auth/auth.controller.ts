import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { JwtGuard } from './jwt/jwt.guard';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signup(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: LogInDto) {
    return this.authService.login(loginDto);
  }

  @Post('verifyUser')
  verifyPatient(@Body() request ){
    const {username,code}= request
    return this.authService.verifyUser(username , code)
  }

  @UseGuards(JwtGuard)
  @Post('resetPassword')
  resetUserPassword( @Body() resetPasswordDto:ResetPasswordDto, @Req() req){
    return this.authService.resetUserPassword(resetPasswordDto ,req.user)
  }

  @UseGuards(JwtGuard)
  @Get('userData')
  getUserDetails(@Req() req){
    return this.authService.findUser(req.user)
  }

  @Post('resendEmailOTP')
  resendEmailOTP( @Body() request){
    const {email}= request
    return this.authService.sendEmailOTP(email)
  }
  
}
