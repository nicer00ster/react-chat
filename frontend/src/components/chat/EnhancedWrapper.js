import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import styles from './styles';

function EnhancedWrapper(props) {
  const { classes } = props;
  return (
      <Paper className={classes.rootWrapper} elevation={1}>
        {props.children}
      </Paper>
  );
}

EnhancedWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object,
};

export default withStyles(styles)(EnhancedWrapper);
