import { Mongo } from 'meteor/mongo';

const Notifications = new Mongo.Collection('events');
export default Notifications;