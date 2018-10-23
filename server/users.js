import { Meteor } from 'meteor/meteor';
import Users from '/imports/api/users';

Meteor.methods({
  'user.add': async (user) => {
    const x = await Users.insert(user);
    return { status: 'ok', id: x._id };
  },

  'user.update': async (user) => {
    await Users.update({ _id: user._id }, user);
    return { status: 'ok', id: user._id };
  },

  'user.delete': async (user) => {
    await Users.remove({ _id: user._id });
    return { status: 'ok', id: user._id };
  },

  'user.get': async (id) => {
    const results = await Users.find({ _id: id }).fetch() || [];
    return { status: 'ok', user: results.length ? results[0] : null };
  },
});

Meteor.startup(() => {
  Meteor.publish('users', id => Users.find(
    id ? { _id: id } : {},
    {
      fields: {
        _id: 1,
        name: 1,
        fullname: 1,
        firstname: 1,
        prefix: 1,
        lastname: 1,
        email: 1,
        username: 1,
        street: 1,
        postcode: 1,
        housenumber: 1,
        city: 1,
        country: 1,
        role: 1,
      },
      sort: { name: 1 },
    },
  ));
});