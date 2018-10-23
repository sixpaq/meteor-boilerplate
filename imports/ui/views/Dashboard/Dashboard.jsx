import React from 'react';
// import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from '/imports/ui/components/Grid/GridItem.jsx';
import GridContainer from '/imports/ui/components/Grid/GridContainer.jsx';

import MediaCard from '/imports/ui/parts/MediaCard';
import ItemList from '/imports/ui/parts/ItemList';

import dashboardStyle from '/assets/jss/material-dashboard-react/views/dashboardStyle.jsx';

const Dashboard = () => (
  <GridContainer>
    <GridItem xs={12} sm={12} md={6}>
      <MediaCard color="warning" title="Voorbeeldlijst" description="Dynamische lijst uit demo collection">
        <ItemList />
      </MediaCard>
    </GridItem>
  </GridContainer>
);

// Dashboard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(dashboardStyle)(Dashboard);