import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Message from '@material-ui/icons/Message';
import Send from '@material-ui/icons/Send';

import { addMessage, addTypingUser, removeTypingUser } from '../../actions';
import styles from './styles';

function EnhancedInput(props) {
  const { classes } = props;
  return (
    <section className="chat__message" id="new-message">
      <FormControl fullWidth>
        <InputLabel htmlFor="inputLabel">Your message here...</InputLabel>
        <Input
          id="inputLabel"
          type="text"
          onChange={e => props.handleInput(e.target.value, props.channel)}
          value={props.message}
          onKeyPress={e => {
            props.addTypingUser(props.uid);
            if (e.key === 'Enter') {
              props.addMessage(props.message, props.channel, props.username);
              props.removeTypingUser(props.uid);
            }
          }}
          startAdornment={
            <InputAdornment position="start">
              <Message color="secondary" />
            </InputAdornment>
          } />
        </FormControl>
        <Button
          onClick={() => props.addMessage(props.message, props.channel, props.username)}
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}>
          Send
          <Send color="secondary" className={classes.rightIcon} />
        </Button>
    </section>
  );
}

EnhancedInput.propTypes = {
  addMessage: PropTypes.func,
  classes: PropTypes.object,
  addTypingUser: PropTypes.func,
  removeTypingUser: PropTypes.func,
};

const mapDispatchToProps = {
  addMessage,
  addTypingUser,
  removeTypingUser,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(EnhancedInput));
