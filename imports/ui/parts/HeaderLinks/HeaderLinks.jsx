import React from 'react';
import classNames from 'classnames';
import { get } from 'lodash';
import { withRouter } from 'react-router';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Hidden from '@material-ui/core/Hidden';
import Poppers from '@material-ui/core/Popper';
// @material-ui/icons
import Person from '@material-ui/icons/Person';
import Notifications from '@material-ui/icons/Notifications';
// import Dashboard from '@material-ui/icons/Dashboard';
import Search from '@material-ui/icons/Search';
// core components
import CustomInput from '/imports/ui/components/CustomInput/CustomInput.jsx';
import Button from '/imports/ui/components/CustomButtons/Button.jsx';

import headerLinksStyle from '/assets/jss/material-dashboard-react/components/headerLinksStyle.jsx';

import withSubscription from '/imports/core/subscription';
import NotificationsCollection from '/imports/api/notifications';

class HeaderLinks extends React.Component {
  state = {
    openNotifications: false,
    openUser: false,
  };

  handleToggleMessages = () => {
    this.setState(state => ({ openNotifications: !state.openNotifications }));
  };

  handleToggleUser = () => {
    this.setState(state => ({ openUser: !state.openUser }));
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ openNotifications: false, openUser: false });
  };

  render() {
    const { classes, rows } = this.props;
    const { openNotifications, openUser } = this.state;
    return (
      <div>
        <div className={classes.searchWrapper}>
          <CustomInput
            formControlProps={{
              className: `${classes.margin} ${classes.search}`,
            }}
            inputProps={{
              placeholder: 'Search',
              inputProps: {
                'aria-label': 'Search',
              },
            }}
          />
          <Button color="white" aria-label="edit" justIcon round>
            <Search />
          </Button>
        </div>
        <div className={classes.manager}>
          <Button
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
            color={window.innerWidth > 959 ? 'transparent' : 'white'}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={openNotifications ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleToggleMessages}
            className={classes.buttonLink}
          >
            <Notifications className={classes.icons} />
            <span className={classes.notifications}>{get(rows, 'length', -1)}</span>
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>
                Notification
              </p>
            </Hidden>
          </Button>
          <Poppers
            open={openNotifications}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            className={
              `${classNames({ [classes.popperClose]: !openUser })} ${classes.pooperNav}`
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      {rows.map(row => (
                        <MenuItem
                          onClick={this.handleClose}
                          className={classes.dropdownItem}
                        >
                          {row.title}
                        </MenuItem>))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Person"
          aria-owns={openUser ? 'menu-list-grow' : null}
          aria-haspopup="true"
          onClick={this.handleToggleUser}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={openUser}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          className={
            `${classNames({ [classes.popperClose]: !openUser })} ${classes.pooperNav}`
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={() => { this.props.history.push('/users/edit/1'); }}
                      className={classes.dropdownItem}
                    >
                      Edit profile
                    </MenuItem>))
                    <MenuItem
                      href="/logoff"
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Logoff
                    </MenuItem>))
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    );
  }
}

export default withRouter(withSubscription({
  key: 'notifications',
  get: () => NotificationsCollection.find().fetch(),
})(withStyles(headerLinksStyle)(HeaderLinks)));