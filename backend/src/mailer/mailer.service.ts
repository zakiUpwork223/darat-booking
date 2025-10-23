import { Injectable } from '@nestjs/common';
require('dotenv').config();
const nodemailer = require('nodemailer');

@Injectable()
export class MailerService {
  async sendEmail(
    recepient: string,
    subject: string,
    email_body: string,
  ): Promise<any> {
    const transporter = this.getTransporter();
    const mailOptions = this.getMailOptions(recepient, subject, email_body);

    transporter.sendMail(mailOptions, (error: { message: any }) => {
      if (error) {
        console.log('Error in sending mail(mailer service)', error.message);
      } else {
        console.log('Email Sent');
      }
    });
  }

  getTransporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      host: 'ssmtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_EMAIL_PASSWORD,
      },
    });
  }

  getMailOptions(recepient: string, subject: string, email_body: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recepient,
      subject: subject,
      text: email_body,
    };

    return mailOptions;
  }
}
