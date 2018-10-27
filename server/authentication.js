import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

const services = [
  {
    service: 'facebook',
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    icon: 'fa-facebook-square',
    title: 'Login using your Facebook account',
  }, {
    service: 'google',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    icon: 'fa-google-plus',
    title: 'Login using your Google account',
  }, {
    service: 'github',
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    icon: 'fa-github',
    title: 'Login using your Github account',
  }, {
    service: 'twitter',
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_SECRET,
    icon: 'fa-twitter',
    title: 'Login using your Twitter account',
  }, {
    service: 'dropbox',
    clientId: process.env.DROPBOX_CLIENT_ID,
    clientSecret: process.env.DROPBOX_SECRET,
    icon: 'fa-dropbox',
    title: 'Login using your Dropbox account',
  }, {
    service: 'linkedin',
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_SECRET,
    icon: 'fa-linkedin',
    title: 'Login using your LinkedIn account',
  },
];

Meteor.methods({
  'auth.services': async () => (services
    .filter(s => s.clientId && s.clientSecret)
    .map(s => ({
      service: s.service,
      clientId: s.clientId,
      icon: s.icon,
      title: s.title,
    }))
  ),
});

Meteor.startup(() => {
  services.filter(s => s.clientId && s.clientSecret).forEach(s =>
    ServiceConfiguration.configurations.upsert(
      { service: s.service },
      {
        $set: {
          clientId: s.clientId,
          secret: s.clientSecret,
          loginStyle: 'redirect',
        },
      },
    ));
});