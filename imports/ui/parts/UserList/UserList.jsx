import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { List, ListItem, ListItemText, Avatar, IconButton } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { withStyles } from '@material-ui/core/styles';
import withSubscription from '/imports/core/subscription';
import UsersCollection from '/imports/api/users';
import AlertDialog from '/imports/ui/parts/Confirm';

import { USERS_EDIT, USERS_DELETE } from '/imports/reducers/Users/actions';

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit / 5,
    fontSize: 24,
    color: theme.palette.text.primary,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.doDelete = this.doDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  state = {
    confirmDelete: false,
    deleteCandidate: null,
  }

  handleEdit = (user) => {
    this.props.editUser(user);
    this.props.history.push(`/users/edit/${user._id}`);
  }

  handleDelete = (user) => {
    this.props.deleteUser(user);
    this.setState({ confirmDelete: true, deleteCandidate: user });
  }

  doDelete = () => {
    Meteor.call('user.delete', { _id: get(this.state, 'deleteCandidate._id') });
    this.setState({ confirmDelete: false, deleteCandidate: null });
  }

  render() {
    const { classes, rows: users } = this.props || {};
    const deleteCandidate = (this.state || {}).deleteCandidate || {};
    return (
      <div>
        <AlertDialog
          open={this.state.confirmDelete}
          title="Delete User"
          handleAgree={() => this.doDelete()}
          handleDisagree={() => this.setState({ confirmDelete: false })}
        >
          <div>
            User {deleteCandidate.email || deleteCandidate.username} is about to be
            deleted. Are you sure you want to continue?
          </div>
        </AlertDialog>
        <List>
          {(users || []).map(user => (
            <ListItem key={user._id}>
              <Avatar>
                <ImageIcon />
              </Avatar>
              <ListItemText primary={user.fullname || ([user.fistname, user.prefix, user.lastname].join(' '))} secondary={user.email || user.username} />
              <IconButton onClick={() => this.handleEdit(user)}>
                <EditIcon className={classes.icon} />
              </IconButton>
              <IconButton onClick={() => this.handleDelete(user)}>
                <DeleteIcon className={classes.icon} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default connect(
  state => state.users,
  dispatch => ({
    editUser: () => dispatch({ type: USERS_EDIT }),
    deleteUser: () => dispatch({ type: USERS_DELETE }),
  }),
)(withRouter(withSubscription({
  key: 'users',
  get: () => UsersCollection.find().fetch(),
})(withStyles(styles)(UserList))));