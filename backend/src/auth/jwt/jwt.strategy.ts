import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { PatientService } from 'src/patient/patient.service';
import { AdminService } from 'src/admin/admin.service';
import { DoctorService } from 'src/doctor/doctor.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        config: ConfigService,
        private patientService: PatientService,
        private adminService: AdminService,
        private doctorService: DoctorService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: { userId: string; role: string }) {
        const userRole = payload.role
        switch (userRole) {
            case 'Patient': {
                const patientData = await this.patientService.findOnePatientByID(payload.userId)
                const {password , ...restdata} = patientData
                return restdata;
            }
            case 'Admin': {
                const adminData = await this.adminService.findOneAdminByID(payload.userId)
                const {password , ...restdata} = adminData
                return restdata;
            }
            case 'Doctor': {
                const doctorData = await this.doctorService.findOneDoctorById(payload.userId)
                const {password , ...restdata} = doctorData
                return restdata;
            }
            default: {
                throw new InternalServerErrorException('error in Auth Strategy')
            }
        }
    }
}
