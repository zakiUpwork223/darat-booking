import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {

    hello() {
        return { message: 'Booking Engine is UP' };
    }
}