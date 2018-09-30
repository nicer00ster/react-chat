import React from 'react';
import PropTypes from 'prop-types';
import EnhancedForm from './EnhancedForm';

function Register(props) {
  return (
    <EnhancedForm
      handleInput={props.handleInput}
      location={props.location}
      onSubmit={props.register}
      component='Register'
      link='Login'
      url='/login'
      user={props.user}
      app={props.app}
    />
  );
}

Register.propTypes = {
  handleInput: PropTypes.func,
  location: PropTypes.object,
  register: PropTypes.func,
  user: PropTypes.object,
};

export default Register;
