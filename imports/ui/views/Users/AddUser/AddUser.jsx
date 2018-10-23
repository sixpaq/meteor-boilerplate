import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserProfile from '/imports/ui/parts/UserProfile';
import { addUser } from '/imports/reducers/Users/actions';

const AddUser = (props) => {
  const save = (user) => {
    props.addUser(user);
    // props.history.push('/users');
    props.history.goBack();
  };

  const cancel = () => {
    props.history.goBack();
  };

  return (
    <UserProfile
      mode="add"
      onSave={save}
      onCancel={cancel}
    />
  );
};

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUser(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddUser));