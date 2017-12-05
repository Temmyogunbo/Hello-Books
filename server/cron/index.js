import { CronJob } from 'cron';
import emailNotification from './emailNotification';

export const sendEmailNotification = () =>
  new CronJob({
    cronTime: '00 30 11 * * 1-5',
    onTick: emailNotification,
    timeZone: 'Africa/Lagos',
    start: true
  });

emailNotification();

export default {};
