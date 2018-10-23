import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import '/assets/css/material-dashboard-react.css';
import 'react-notifications/dist/react-notifications.css';

import indexRoutes from '/imports/routes/index.jsx';

import history from './core/history';
import store from './core/store';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          {indexRoutes.map(prop =>
            (<Route
              path={prop.path}
              component={prop.component}
              key={prop.key}
            />))}
        </Switch>
      </Router>
    </Provider>
    <NotificationContainer />
  </MuiThemeProvider>
);

export default App;