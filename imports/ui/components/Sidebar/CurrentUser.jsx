import { Meteor } from 'meteor/meteor';
import React from 'react';
import classNames from 'classnames';
import Gravatar from 'react-gravatar';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  userTag: {
    display: 'flex',
    marginLeft: -10,
    marginRight: -10,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },

  gravatar: {
    borderRadius: '50%',
    overflow: 'hidden',
    margin: 0,
  },

  textEllipsis: {
    width: '100%',
    overflow: 'none',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  details: {
    marginLeft: 10,
  },

  primaryText: {
    color: '#fff',
  },

  secondaryText: {
    color: '#ccc',
  },
};

class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    Meteor.call('user.get', Meteor.userId(), (err, user) => {
      if (err) {
        console.error(err);
        return;
      }
      this.setState({ user });
    });
  }

  render() {
    const { user = {} } = this.state;
    const { classes } = this.props;

    return (
      <ListItem button className={classNames([classes.itemLink])}>
        <div className={classes.userTag}>
          { user.email ? (
            <div className={classes.gravatar}>
              <Gravatar size={60} email={user.email} />
            </div>)
          : null }
          <div className={classes.details}>
            <div className={classNames([classes.primaryText, classes.textEllipsis])}>
              {user.name}
            </div>
            <div className={classNames([classes.secondaryText, classes.textEllipsis])}>
              {user.email}
            </div>
          </div>
        </div>
      </ListItem>
    );
  }
}

export default withStyles(styles)(CurrentUser);