import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
// core components
import HeaderLinks from '/imports/ui/components/Header/HeaderLinks.jsx';

import sidebarStyle from '/assets/jss/material-dashboard-react/components/sidebarStyle.jsx';

import CurrentUser from './CurrentUser.jsx';

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1;
  }
  const {
    classes, color, logo, image, logoText, routes,
  } = props;
  const links = (
    <List className={classes.list}>
      <CurrentUser color={color} />
      {routes.filter(r => r.menu).map((prop) => {
        if (prop.redirect) return null;
        const listItemClasses = classNames({
          [` ${classes[color]}`]: activeRoute(prop.path),
        });
        const whiteFontClasses = classNames({
          [` ${classes.whiteFont}`]: activeRoute(prop.path),
        });
        return (
          <NavLink
            to={prop.path}
            className={classes.item}
            activeClassName="active"
            key={prop.key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                {typeof prop.icon === 'string' ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <prop.icon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
                className={classes.itemText + whiteFontClasses}
                disableTypography
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  const brand = (
    <div className={classes.logo}>
      <a href="/" className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <HeaderLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

export default withStyles(sidebarStyle)(Sidebar);