import { InvoiceType } from '@prisma/client';
export interface receiptData{
    stripeId: string,
    client_secret: string,
    paymentAmount: number,
    type:InvoiceType,
    appointmentId:string
  }