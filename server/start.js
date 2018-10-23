import { Meteor } from 'meteor/meteor';
import Demo from '/imports/api/demo';
import Notifications from '/imports/api/notifications';
import Sallery from '/imports/api/sallery';

function start () {
  Meteor.startup(() => {
    console.log('startup::MONGO_URL', process.env.MONGO_URL);

    Meteor.publish('demo', () => Demo.find({}, {
      fields: { _id: 1, name: 1, description: 1 },
      sort: { name: 1 },
    }));

    Meteor.publish('notifications', () => Notifications
      .find(
        {},
        { fields: { _id: 1, title: 1, description: 1 }, sort: { createdAt: -1 } },
      ));

    Meteor.publish('sallery', () => Sallery.find({}, {
      fields: {
        _id: 1, name: 1, sallery: 1, country: 1,
      },
      sort: { name: 1 },
    }));
  });
}

export default start;