import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.25)',
  },
});

function EnhancedWrapper(props) {
  const { classes } = props;
  return (
      <Paper className={classes.root} elevation={1}>
        {props.children}
      </Paper>
  );
}

EnhancedWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object,
};

export default withStyles(styles)(EnhancedWrapper);
