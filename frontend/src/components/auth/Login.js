import React from 'react';
import PropTypes from 'prop-types';
import EnhancedForm from './EnhancedForm';

function Login(props) {
  return (
    <EnhancedForm
      handleInput={props.handleInput}
      location={props.location}
      onSubmit={props.login}
      component='Login'
      link='register?'
      url='/register'
      user={props.user}
      app={props.app}
    />
  );
}

Login.propTypes = {
  handleInput: PropTypes.func,
  login: PropTypes.func,
  location: PropTypes.object,
  user: PropTypes.object,
};

export default Login;
