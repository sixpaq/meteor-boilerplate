// /* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import Header from '/imports/ui/components/Header/Header.jsx';
import Footer from '/imports/ui/components/Footer/Footer.jsx';
import Sidebar from '/imports/ui/components/Sidebar/Sidebar.jsx';
import ErrorBoundary from '/imports/core/errorboundary.js';
import HeaderLinks from '/imports/ui/parts/HeaderLinks';

import dashboardRoutes from '/imports/routes/dashboard.jsx';

import dashboardStyle from '/assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx';

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop) => {
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
    this.mainPanel = null;
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

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      if (this.mainPanel) {
        this.mainPanel.scrollTop = 0;
      }
      if (this.state.mobileOpen) {
        // this.onUpdate(function (newOpen) {
        //   this.setState({ mobileOpen: newOpen });
        // });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction);
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText="Boilerplate"
          logo="/images/reactlogo.png"
          image="/images/sidebar-2.jpg"
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref={this.mainPanel}>
          <ErrorBoundary>
            <Header
              routes={dashboardRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
              headerLinks={<HeaderLinks />}
              {...rest}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          </ErrorBoundary>

          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(dashboardStyle)(App);