// import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Card from '/imports/ui/components/Card/Card.jsx';
import CardBody from '/imports/ui/components/Card/CardBody.jsx';
import CardHeader from '/imports/ui/components/Card/CardHeader.jsx';
import CardFooter from '/imports/ui/components/Card/CardFooter.jsx';
import CardIcon from '/imports/ui/components/Card/CardIcon.jsx';

const styles = {
  card: {
    maxWidth: 300,
  },
  media: {
    height: 140,
  },
};

const MediaCard = ({
  children, classes, color, title, description, buttons, icon, iconcolor, footer,
}) => (
  <Card>
    <CardHeader color={color}>
      { icon ?
        <CardIcon color={iconcolor || color}>
          <Icon>{ icon || 'content_copy' }</Icon>
        </CardIcon>
        : null
      }
      <h3 className={classes.cardTitleWhite}>{title}</h3>
      <p className={classes.cardCategoryWhite}>
        {description}
      </p>
      {buttons}
    </CardHeader>
    <CardBody>
      {children}
    </CardBody>
    { footer ? (
      <CardFooter color={color}>
        {footer}
      </CardFooter>
    ) : null }
  </Card>
);

MediaCard.defaultProps = {
  color: 'primary',
  iconcolor: 'primary',
  buttons: null,
  footer: null,
  icon: null,
};

MediaCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'warning',
    'info',
    'rose',
  ]),
  buttons: PropTypes.node,
  footer: PropTypes.node,
  icon: PropTypes.node,
  iconcolor: PropTypes.oneOf([
    'primary',
    'secondary',
  ]),
};

export default withStyles(styles)(MediaCard);