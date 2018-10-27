import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import ErrorBoundary from '/imports/core/errorboundary.js';

import authenticationRoutes from '/imports/routes/authentication.jsx';

const authenticationStyle = {
  loginPage: {
    display: 'inline-block',
    width: '100%',
    height: '100%',
    margin: 0,
    backgroundImage: 'url(\'/images/login-01.jpg\')',
    backgroundSize: 'cover',
  },
};

const SwitchRoutes = () => (
  <Switch>
    {authenticationRoutes.map((prop) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.to} key={prop.key} />;
      }
      return <Route path={prop.path} component={prop.component} key={prop.key} />;
    })}
  </Switch>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeFunction);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.loginPage}>
        <ErrorBoundary>
          <SwitchRoutes />
        </ErrorBoundary>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(authenticationStyle)(App);