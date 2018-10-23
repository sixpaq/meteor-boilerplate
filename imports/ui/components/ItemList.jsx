// import { Meteor } from 'meteor/meteor';
import React from 'react';
import { stopSubscription } from 'meteor-redux-middlewares';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
// import Demo from '/imports/api/demo';
import { loadDemo, DEMO } from '../../reducers/demo/actions';

class ItemList extends React.Component {
  componentDidMount() {
    this.props.subscribe();
  }

  componentWillUnmount() {
    this.props.unsubscribe();
  }

  render() {
    const { loaded, rows, receivedAt } = this.props || {};

    // if (!loaded) {
    //   return (<div className="loading"><h5>Loading ...</h5></div>);
    // }

    console.log('rows', receivedAt, rows);
    return (
      <div>
        <List>
          {rows.map(row => (
            <ListItem key={row._id}>
              <Avatar>
                <ImageIcon />
              </Avatar>
              <ListItemText primary={row.name} secondary={row.description} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loaded: state.demo.ready,
  rows: state.demo.rows,
  subscriptionActive: state.demo.subscriptionActive,
});

const mapDispatchToProps = dispatch => ({
  subscribe: () => {
    dispatch(loadDemo());
  },
  unsubscribe: () => {
    dispatch(stopSubscription(DEMO));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemList);