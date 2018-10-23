import React from 'react';
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components

// material-ui components
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import buttonStyle from '/assets/jss/material-dashboard-react/components/buttonStyle.jsx';

function RegularButton({ ...props }) {
  const {
    classes,
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    type,
    ...rest
  } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className,
  });
  return (
    <Button {...rest} type={type} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  );
}

RegularButton.defaultProps = {
  color: 'secondary',
  size: 'md',
  simple: false,
  round: false,
  disabled: false,
  block: false,
  link: false,
  justIcon: false,
  className: null,
  muiClasses: null,
  type: null,
};

RegularButton.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
    'white',
    'transparent',
  ]),
  type: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  // use this to pass the classes props from Material-UI
  muiClasses: PropTypes.shape({}),
};

export default withStyles(buttonStyle)(RegularButton);