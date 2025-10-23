import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PatientModule } from './patient/patient.module';
import { ServicesModule } from './services/medical_services.module';
import { DoctorModule } from './doctor/doctor.module';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './image/image.module';
import { MailerModule } from './mailer/mailer.module';
//import { VerifyService } from './utils/verify.service';
import { DrScheduleModule } from './schedule/dr_schedule.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PaymentModule } from './payment/payment.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roleGuard/role.guard';
import { JwtGuard } from './auth/jwt/jwt.guard';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { SocketsModule } from './sockets/sockets.module';
import { WebsocketGateway } from './sockets/websocket.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { MyCronJob } from './utils/cron.job';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { CustomerPaymentsModule } from './customer_payments/customer_payments.module';
import { FeedbackModule } from './feedback/feedback.module';
import { CategoriesModule } from './modules/admin/categories/categories.module';
import { ItemsModule } from './modules/admin/items/items.module';
import { MenuModule } from './modules/customer/menu/menu.module';
import { CustomersModule } from './modules/customer/customers/customers.module';
import { CartModule } from './modules/customer/cart/cart.module';
import { DiscountsModule } from './modules/admin/discounts/discounts.module';
import { OrdersModule } from './modules/customer/orders/orders.module';
import { ReportingModule } from './modules/admin/reporting/reporting.module';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { FavoriteItemsModule } from './modules/customer/favorite_items/favorite_items.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    AdminModule,
    PatientModule,
    ServicesModule,
    DoctorModule,
    ImageModule,
    MailerModule,
    DrScheduleModule,
    AppointmentModule,
    PaymentModule,
    LoyaltyModule,
    SocketsModule,
    ScheduleModule.forRoot(),
    CustomerPaymentsModule,
    FeedbackModule,

    CategoriesModule,
    ItemsModule,
    MenuModule,
    CustomersModule,
    CartModule,
    //ImageModule,
    DiscountsModule,
    OrdersModule,
    ReportingModule,
    SearchModule,
    FavoriteItemsModule
  ],
  controllers: [AppController],
  providers: [AppService,RolesGuard, WebsocketGateway, MyCronJob],
})
export class AppModule { }
