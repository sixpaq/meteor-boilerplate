import React from 'react';
import { Provider, connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Router, Route, Switch } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { NotificationContainer } from 'react-notifications';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import '/assets/css/material-dashboard-react.css';
import 'react-notifications/dist/react-notifications.css';

import indexRoutes from '/imports/routes/index.jsx';

import history from './core/history';
import store from './core/store';
import { USER_LOGGED_OUT, USER_LOGGED_IN } from './reducers/Users/actions';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
  },
});

class AppContent extends React.Component {
  componentDidMount() {
    Accounts.onLogin(() => {
      this.props.loggedIn();
      this.props.history.push('/');
    });

    Accounts.onLogout(() => {
      this.props.loggedOut();
      setTimeout(() => this.props.history.push('/auth/login'), 100);
    });
  }

  render() {
    return (
      <Switch>
        {indexRoutes.map(prop =>
          (<Route
            path={prop.path}
            component={prop.component}
            key={prop.key}
          />))}
      </Switch>
    );
  }
}

const ConnectedAppContent = withRouter(connect(
  () => {},
  dispatch => ({
    loggedIn: () => dispatch({ type: USER_LOGGED_IN }),
    loggedOut: () => dispatch({ type: USER_LOGGED_OUT }),
  }),
)(AppContent));

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <ConnectedAppContent />
      </Router>
    </Provider>
    <NotificationContainer />
  </MuiThemeProvider>
);

export default App;