import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { get } from 'lodash';
import UserProfile from '/imports/ui/parts/UserProfile';
import { updateUser } from '/imports/reducers/Users/actions';

class EditUser extends React.Component {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  state = {
    user: null,
  }

  save = (user) => {
    this.props.updateUser(user);
    this.props.history.goBack();
  };

  cancel = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    const id = get(this.props, 'match.params.id');
    Meteor.call('user.get', id, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      this.setState({ user: result.user });
    });
  }

  render() {
    if (!this.state.user) {
      return null;
    }

    return (<UserProfile
      mode="edit"
      onSave={this.save}
      onCancel={this.cancel}
      user={this.state.user}
    />);
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUser));