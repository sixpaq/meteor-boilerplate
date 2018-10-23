import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleDisagree} color="default">
            Disagree
          </Button>
          <Button onClick={this.props.handleAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AlertDialog.defaultProps = {
  open: false,
};

AlertDialog.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node.isRequired,
  handleAgree: PropTypes.func.isRequired,
  handleDisagree: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default AlertDialog;