loader example

```
import { Injectable, Scope } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import * as DataLoader from 'dataloader';
 
@Injectable({ scope: Scope.REQUEST })
export default class PostsLoaders {
  constructor(
    private usersService: UsersService,
  ) {
  }
 
  public readonly batchAuthors = new DataLoader(async (authorIds: number[]) => {
    const users = await this.usersService.getByIds(authorIds);
    const usersMap = new Map(users.map(user => [user.id, user]));
    return authorIds.map(authorId => usersMap.get(authorId));
  })
}
```
cron job

 ┌────────────── second (optional)
 │ ┌──────────── minute
 │ │ ┌────────── hour
 │ │ │ ┌──────── day of the month
 │ │ │ │ ┌────── month
 │ │ │ │ │ ┌──── day of week (0 or 7 are Sunday)
 │ │ │ │ │ │
 │ │ │ │ │ │
 * * * * * *

sending emails by dynamically creating jobs
 ```
import { IsString, IsNotEmpty, IsDateString, IsEmail } from 'class-validator';
 
export class EmailScheduleDto {
  @IsEmail()
  recipient: string;
 
  @IsString()
  @IsNotEmpty()
  subject: string;
 
  @IsString()
  @IsNotEmpty()
  content: string;
 
  @IsDateString()
  date: string;
}
 
export default EmailScheduleDto;


import {
  Body,
  Controller,
  UseGuards,
  Post,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import EmailSchedulingService from './emailScheduling.service';
import EmailScheduleDto from './dto/emailSchedule.dto';
 
@Controller('email-scheduling')
export default class EmailSchedulingController {
  constructor(
    private readonly emailSchedulingService: EmailSchedulingService
  ) {}
 
  @Post('schedule')
  @UseGuards(JwtAuthenticationGuard)
  async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
    this.emailSchedulingService.scheduleEmail(emailSchedule);
  }
}


import { Injectable } from '@nestjs/common';
import EmailService from '../email/email.service';
import EmailScheduleDto from './dto/emailSchedule.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
 
@Injectable()
export default class EmailSchedulingService {
  constructor(
    private readonly emailService: EmailService,
    private readonly schedulerRegistry: SchedulerRegistry
  ) {}
 
  scheduleEmail(emailSchedule: EmailScheduleDto) {
    const date = new Date(emailSchedule.date);
    const job = new CronJob(date, () => {
      this.emailService.sendMail({
        to: emailSchedule.recipient,
        subject: emailSchedule.subject,
        text: emailSchedule.content
      })
    });
 
    this.schedulerRegistry.addCronJob(`${Date.now()}-${emailSchedule.subject}`, job);
    job.start();
  }



  cancelAllScheduledEmails() {
    this.schedulerRegistry.getCronJobs().forEach((job) => {
        job.stop();
    })
  }
}
 ```