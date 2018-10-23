import React from 'react';
import { withRouter } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

import Add from '@material-ui/icons/Add';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MediaCard from '/imports/ui/parts/MediaCard';
import UserList from '/imports/ui/parts/UserList';

import { USERS_ADD } from '/imports/reducers/Users/actions';

const styles = theme => ({
  root: {
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  wrapper: {
    maxWidth: 600,
    margin: '0 auto',
  },
});

const Users = (props) => {
  const { classes } = props;

  const handleAdd = () => {
    props.addUser();
    props.history.push('/users/add');
  };

  return (
    <MediaCard color="warning" title="Users" description="List of users" >
      <UserList />
      <Toolbar>
        <Grid
          justify="space-between"
          alignContent="center"
          container
          spacing={24}
        >
          <Grid item />

          <Grid item>
            <Button
              variant="fab"
              color="primary"
              round="true"
              aria-label="Add"
              className={classes.fab}
              onClick={handleAdd}
            >
              <Add />
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </MediaCard>
  );
};

export default connect(
  state => state.users,
  dispatch => ({
    addUser: () => dispatch({ type: USERS_ADD }),
  }),
)(withRouter(withStyles(styles)(Users)));