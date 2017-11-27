import Notifications from '../config/socket/Notifications/notifications';

export default (io) => {
  io.on('connect', (client) => {
    client.on('admin', () => {
      client.join('admin');
    });
    const Notification = new Notifications(io);
    console.log('client connected');
    client.on('disconnect', () => {
      console.log('client disconnected');
    });
    client.on('GET_ALL_NOTIFICATIONS', () => {
      Notification.getAllNotifications();
    });
    client.on('ADD_NEW_NOTIFICATION', (data) => {
      Notification.addNotification(data);
    });
    client.on('UPDATE_NOTIFICATION', (data) => {
      Notification.updateNotification(data);
    });
  });
};
