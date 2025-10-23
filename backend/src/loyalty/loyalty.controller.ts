import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';

import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { UpdateUserRewardsDto } from './dto/update-user-rewards.dto';
import { RolesGuard } from 'src/roleGuard/role.guard';
import { Role } from 'src/roleGuard/role.enum';
import { Roles } from 'src/roleGuard/role.decorator';

@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @UseGuards(JwtGuard)
  @Post('generatePoints')
  createPoints(@Body() createLoyaltyDto: CreateLoyaltyDto , @Req() req) {
    return "for BE "//this.loyaltyService.createPoints(createLoyaltyDto , req.user);
  }

  @UseGuards(JwtGuard)
  @Get('points')
  findAll( @Req() req) {
    return this.loyaltyService.getUserPoints(req.user);
  }

  @UseGuards(JwtGuard)
  @Post('redeemPoints')
  redeemPoints(@Body() request: { packageType: string } , @Req() req) {
    const { packageType } = request;
    if (!["Silver", "Gold", "Platinum"].includes(packageType)) {
      throw new BadRequestException('Invalid packageType. Must be Silver, Gold, or Platinum.');
  }
    return this.loyaltyService.redeemPoints(packageType , req.user);
  }

  // @UseGuards(JwtGuard)
  // @Post('createPackage')
  // createPackage(@Body() createPackageDto) { // body request and
  //   //return this.loyaltyService.createPackage(createPackageDto , 'df//' );
  // }


  @UseGuards(JwtGuard)
  @Post('getUserLoyaltyPackage')
  userLoyaltyPackage(@Body() request: { userEmail: string } , @Req() req) { 
    const { userEmail } = request;
    return this.loyaltyService.getUserLoyaltyPackage(userEmail , req.user );
  }

  @UseGuards(JwtGuard , RolesGuard)
  @Roles(Role.Admin)
  @Post('updateUserRewards')
  updateUserRewards(@Body() updateUserRewardsDto: UpdateUserRewardsDto) { 
    return this.loyaltyService.updateUserRewards(updateUserRewardsDto);
  }

  @Post('getAllLoyaltyPackages')
  allLoyaltyPackages() { 
    return this.loyaltyService.getAllLoyaltyPackages();
  }
}
