import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from '/imports/ui/components/Grid/GridItem.jsx';
import GridContainer from '/imports/ui/components/Grid/GridContainer.jsx';
import Grid from '@material-ui/core/Grid';

// core components
import CustomInput from '/imports/ui/components/CustomInput/CustomInput.jsx';
import Button from '/imports/ui/components/CustomButtons/Button.jsx';
import MediaCard from '/imports/ui/parts/MediaCard';

const styles = {
  marginTop: {
    marginTop: '2rem',
  },
};

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      user: props.user || {},
    };
  }

  state = {
    user: {},
  }

  handleChange(id, event) {
    const user = this.state.user || {};
    user[id] = event.target.value;
    this.setState({ user });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit', this.state.user);
    this.props.onSave(this.state.user);
  }

  render () {
    const {
      classes,
      onCancel,
      mode,
      user = {},
    } = this.props;
    console.log('EditUser', user);

    return (
      <MediaCard
        color="primary"
        title={mode === 'add' ? 'Add user' : 'Edit user'}
        description={mode === 'add' ? 'Add a new user' : 'Modify the user profile'}
      >
        <form onSubmit={this.handleSubmit}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={5}>
              <CustomInput
                labelText="Company (disabled)"
                id="company-disabled"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  disabled: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="Username"
                id="username"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: user.username,
                  onChange: event => this.handleChange('username', event),
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText="Email address"
                id="emailaddress"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: user.email,
                  onChange: event => this.handleChange('email', event),
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="First Name"
                id="firstname"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: user.firstname,
                  onChange: event => this.handleChange('firstname', event),
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="Last Name"
                id="lastname"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: user.lastname,
                  onChange: event => this.handleChange('lastname', event),
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText="City"
                id="city"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: user.city,
                  onChange: event => this.handleChange('city', event),
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText="Country"
                id="country"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: user.country,
                  onChange: event => this.handleChange('country', event),
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText="Postal Code"
                id="postal-code"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: user.postcode,
                  onChange: event => this.handleChange('postcode', event),
                }}
              />
            </GridItem>
          </GridContainer>
          <Grid container justify="space-between" className={classes.marginTop}>
            <Grid item />
            <Grid item>
              <Button color="primary" type="submit">
                {mode === 'add' ? 'Add' : 'Save'}
              </Button>
              <Button color="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </MediaCard>
    );
  }
}

UserProfile.defaultProps = {
};

UserProfile.propTypes = {
  mode: PropTypes.oneOf([
    'add',
    'edit',
  ]).isRequired,
};

export default withStyles(styles)(UserProfile);