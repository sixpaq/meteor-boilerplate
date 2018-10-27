import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

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

class SocialButtons extends React.Component {
  state = {
    services: [],
  };

  componentDidMount() {
    Meteor.call('auth.services', (err, services) => this.setState({ services }));
  }

  capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1);

  render() {
    const { classes } = this.props;
    const { services } = this.state;
    return (
      <div className={classes.socialButtons}>
        { services.map(service => (
          <a
            key={service.service}
            href={null}
            onClick={() => Meteor[`loginWith${this.capitalizeFirstLetter(service.service)}`]({
              requestPermissions: ['user', 'public_profile', 'email'],
            }, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              this.props.history.push('/');
            })}
          >
            <span className={classes.socialButton}><i className={`fa ${service.icon}`} /></span>
          </a>
          ))
        }
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(SocialButtons));