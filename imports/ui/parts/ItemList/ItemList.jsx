import React from 'react';
import { List, ListItem, ListItemText, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import withSubscription from '/imports/core/subscription';
import DemoCollection from '/imports/api/demo';

class ItemList extends React.Component {
  componentWillUnmount() {
  }

  render() {
    const { rows } = this.props || {};

    return (
      <List>
        {(rows || []).map(row => (
          <ListItem key={row._id}>
            <Avatar>
              <ImageIcon />
            </Avatar>
            <ListItemText primary={row.name} secondary={row.description} />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withSubscription({
  key: 'demo',
  get: () => DemoCollection.find().fetch(),
})(ItemList);