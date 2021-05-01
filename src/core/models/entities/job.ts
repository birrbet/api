// scheduled jobs
export enum IJobType {}

export interface IScheduledJob {
  jobType: IJobType;
  startTime: string;
  isSucceeded: boolean;
  reasonForFailing: string;
  retryAfter: number;
  runEverySecond: string;
}
