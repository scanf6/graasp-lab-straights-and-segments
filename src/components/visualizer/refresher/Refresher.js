import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RefreshIcon from '@material-ui/icons/Refresh';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  refreshButton: {
    right: theme.spacing.unit * 4,
    bottom: theme.spacing.unit * 12,
    position: 'fixed',
    // position above side menu
    zIndex: 10000,
  },
});

// this function handles the reload button to refresh the whole app
const reloadPage = () => {
  window.location.reload();
};

export const Refresher = ({
  classes,
  themeColor,
}) => (
  <Fab
    color="primary"
    aria-label="Add"
    onClick={reloadPage}
    className={classes.refreshButton}
    style={{ backgroundColor: themeColor }}
  >
    <RefreshIcon style={{ color: 'white' }} />
  </Fab>
);

Refresher.propTypes = {
  themeColor: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
});

export default withStyles(styles)(connect(mapStateToProps)(Refresher));
