// cron.job.ts
import { Injectable } from '@nestjs/common';
import { Cron , CronExpression} from '@nestjs/schedule';

@Injectable()
export class MyCronJob {
  //@Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    //console.log('This will be executed after 5 seconds');
    // Add your task logic here
  }
}
