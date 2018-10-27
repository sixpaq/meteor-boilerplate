# MeteorJS Boilerplate

This boilerplate is based on MeteorJS. The design is based on material-ui.com.
The purpose of this boilerplate is to have a quick start with all the necessary components, without having to implement this everytime.

This boilerplate uses:
- MeteorJS
- Material-UI
- React
- Redux

## Installation and start
``` console
git clone https://github.com/sixpaq/meteor-boilerplate.git

npm install

npm start
```

## Configure oauth
To enable oauth login with services like github, google, facebook etc, you need to add the oauth id and secret
in the environment variables. For an example you can look in .env-sample.

Once the service variables have been added, the service icon will automatically appear in the login screen.

For Github add:
``` console
GITHUB_CLIENT_ID=<client-id>
GITHUB_SECRET=<secret>
```

For Google add:
``` console
GOOGLE_CLIENT_ID=<client-id>
GOOGLE_SECRET=<secret>
```

For Facebook add:
``` console
FACEBOOK_CLIENT_ID=<client-id>
FACEBOOK_SECRET=<secret>
```

For Twitter add:
``` console
TWITTER_CLIENT_ID=<client-id>
TWITTER_SECRET=<secret>
```

## Links
- https://www.meteor.com
- https://material-ui.com
- https://reactjs.org/
- https://redux.js.org
