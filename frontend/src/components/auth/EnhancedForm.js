import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceICon from '@material-ui/icons/KeyboardVoice';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

function EnhancedForm(props) {
  const { classes } = props;
  const buttonClassname = classNames({
    [classes.buttonSuccess]: props.user.authenticated,
  });
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>

          <div className={classes.wrapper}>
            <Button
              variant="fab"
              color="primary"
              disabled={props.user.isLoading}
              className={buttonClassname}>
              {props.user.authenticated ? <CheckIcon /> : <KeyboardVoiceICon />}
            </Button>
            {props.user.isLoading && <CircularProgress size={68} className={classes.fabProgress} />}
          </div>

          <Typography variant="headline">{props.component}</Typography>
          <form
            onSubmit={e => props.onSubmit(e, props.user.username, props.user.password)}
            className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                onChange={e => props.handleInput(e.target.value, 'username')}
                value={props.user.username}
                id="username"
                name="username"
                autoComplete="username"
                autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                onChange={e => props.handleInput(e.target.value, 'password')}
                value={props.user.password}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <div className={classes.wrapper}>
              <Button
                variant="raised"
                fullWidth
                type="submit"
                color="primary"
                className={buttonClassname}
                disabled={props.user.isLoading}>
                {props.component === "Register" ? 'Sign Up' : 'Sign In'}
              </Button>
              {props.user.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </form>
          {
            props.component === 'Register'
              ? <Link to="/login">
                <Button variant="contained" color="secondary" className={classes.button}>
                  Login
                  <KeyboardVoiceICon className={classes.rightIcon} />
                </Button>
                </Link>
              : <Link to="/register">
                  <Button variant="contained" color="secondary" className={classes.button}>
                    Register
                    <CloudUploadIcon className={classes.rightIcon} />
                  </Button>
                </Link>
          }
        </Paper>
      </main>
    </React.Fragment>
  );
}

EnhancedForm.propTypes = {
  onSubmit: PropTypes.func,
  handleInput: PropTypes.func,
  submit: PropTypes.func,
  message: PropTypes.string,
  subtitle: PropTypes.string,
  url: PropTypes.string,
  link: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
};

export default withStyles(styles)(EnhancedForm);
