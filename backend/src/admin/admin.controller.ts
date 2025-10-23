import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/roleGuard/role.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtGuard)
  @UseGuards(RolesGuard)
  @Post()
  createAdmin(@Body() createAdminDto: CreateAdminDto, @Req() req) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAllAdmins();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOneAdminByID(id);
  }

  @Patch(':id')
  updateAdmin(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
