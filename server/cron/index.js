import { CronJob } from 'cron';
import emailNotification from './emailNotification';

/** *
 * cron job for sending notification
 *
 * @returns {object} returns object
 */
export const sendEmailNotification = () =>
  new CronJob({
    cronTime: '00 30 11 * * 1-5',
    onTick: emailNotification,
    timeZone: 'Africa/Lagos',
    start: true
  });

emailNotification();

export default {};
