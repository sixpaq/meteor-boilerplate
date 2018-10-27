import { Meteor } from 'meteor/meteor';
import Users from '/imports/api/users';

Meteor.methods({
  'user.add': async (user) => {
    if (!Meteor.userId()) throw new Meteor.Error(403, 'Forbidden');
    const x = await Users.insert(user);
    return { status: 'ok', id: x._id };
  },

  'user.update': async (user) => {
    if (!Meteor.userId()) throw new Meteor.Error(403, 'Forbidden');
    await Users.update({ _id: user._id }, user);
    return { status: 'ok', id: user._id };
  },

  'user.delete': async (user) => {
    if (!Meteor.userId()) throw new Meteor.Error(403, 'Forbidden');
    await Users.remove({ _id: user._id });
    return { status: 'ok', id: user._id };
  },

  'user.get': async (id) => {
    if (!Meteor.userId()) throw new Meteor.Error(403, 'Forbidden');
    const results = await Users.find({ _id: id }).fetch();
    if (!results) throw new Meteor.Error(404, 'User not found');
    const result = results.firstOrNull();
    if (!result) throw new Meteor.Error(404, 'User not found');
    return transformUser(id, result);
  },
});

const transformUser = (userId, user) => {
  const { profile = {} } = user;
  const transformed = {
    _id: userId,
    name: profile.name,
    email: profile.email,
    services: {},
  };

  if (user.services) {
    if (user.services.github) {
      transformed.services.github = true;
      if (!transformed.email) {
        // prefer primary and verified
        let email = user.services.github.emails.filter(e => e.primary && e.verified).firstOrNull();

        // else take first verified
        if (!email) email = user.services.github.emails.filter(e => e.verified).firstOrNull();

        // else take first
        if (!email) email = user.services.github.emails.firstOrNull();

        if (email) transformed.email = email.email;
      }
    }
  }
  return transformed;
};

Meteor.startup(() => {
  Meteor.publish('userData', function (id) {
    if (!Meteor.userId()) return null;

    const self = this;
    const handle = Meteor.users
      .find(id ? { _id: id } : {})
      .observeChanges({
        added: (userId, fields) => {
          const user = transformUser(userId, fields);
          self.added('users', userId, user);
        },
        changed: (userId, fields) => {
          const user = transformUser(userId, fields);
          self.changed('users', userId, user);
        },
        removed: (userId) => {
          self.removed('users', userId);
        },
      });
    this.onStop(() => {
      handle.stop();
    });
    return this.ready();
  });
});