import { Meteor } from 'meteor/meteor';
import React from 'react';
import { NotificationManager } from 'react-notifications';
import MediaCard from '/imports/ui/parts/MediaCard';
import CustomInput from '/imports/ui/components/CustomInput/CustomInput.jsx';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SocialButtons from './SocialButtons.jsx';

const styles = {
  page: {
    display: 'flex',
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  login: {
    width: '400px',
  },

  socialButtons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  socialButton: {
    margin: '0 .5rem',
    fontSize: '18pt',
    color: '#fff',
  },

  button: {
    marginTop: '4rem',
    fontSize: '12pt',
  },
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(id, event) {
    this.setState({ [id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    Meteor.loginWithPassword(this.state.email, this.state.password, (err, result) => {
      if (err) {
        console.error(err);
        NotificationManager.error(err.message);
      }
    });
  }

  componentWillMount() {
    if (Meteor.userId()) {
      this.props.history.push('/');
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.page}>
        <div className={classes.login}>
          <MediaCard color="rose" title="Login" description="" buttons={(<SocialButtons />)}>
            <form onSubmit={this.handleSubmit}>
              <CustomInput
                labelText="Email"
                id="username"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: event => this.handleChange('username', event),
                }}
              />
              <CustomInput
                labelText="Password"
                id="password"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: 'password',
                  onChange: event => this.handleChange('password', event),
                }}
              />
              <Button type="submit" className={classes.button} color="primary" fullWidth>
                Enter
              </Button>
            </form>
          </MediaCard>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LoginForm);