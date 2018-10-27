import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons

// core components
import cardFooterStyle from '/assets/jss/material-dashboard-react/components/cardFooterStyle.jsx';

function CardFooter({ ...props }) {
  const {
    classes,
    className,
    children,
    color,
    plain,
    profile,
    stats,
    chart,
    ...rest
  } = props;
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes[`${color}CardFooter`]]: color,
    [classes.cardFooterProfile]: profile,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart,
    [className]: className !== undefined,
  });

  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
}

CardFooter.defaultProps = {
  className: null,
  color: 'primary',
  plain: false,
  profile: false,
  stats: false,
  chart: false,
};

CardFooter.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose',
  ]),
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  stats: PropTypes.bool,
  chart: PropTypes.bool,
};

export default withStyles(cardFooterStyle)(CardFooter);