import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Chat from '../chat';

// Dashboard, must be authenticated with Firebase to view.
// Otherwise, trying to direct to any other route will redirect you back at '/'
const Authed = ({
  component: Component,
  authenticated,
  ...rest
}) => (
  <Switch>
    <Route {...rest} render={props => (authenticated === true
      ? <Component { ...props } { ...rest } />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }} />)
    }/>
  </Switch>
);

// Login/Register, if authenticated redirect to dashboard
const NotAuthed = ({
  component: Component,
  authenticated,
  ...rest
}) => (
  <Switch>
    <Route {...rest} render={props => (authenticated === false
      ? <Component { ...props } { ...rest } />
      : <Redirect to='/' />)
    }/>
  </Switch>
);

const Navigation = ({ ...props }) => {
  const { authenticated } = props.user;
  return (
    <Router>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 1 }}
        atActive={{ opacity: 1 }}>
        <NotAuthed {...props} authenticated={authenticated} exact path="/register" component={Register} />
        <NotAuthed {...props} authenticated={authenticated} exact path="/login" component={Login} />
        {/* <NotAuthed {...props} authenticated={authenticated} exact path="/reset" component={ResetPassword} /> */}
        <Authed {...props} authenticated={authenticated} exact path="/" component={Chat} />
        {/* <Authed {...props} authenticated={authenticated} exact path="/schedule" component={Schedule} /> */}
        <Route render={() => <div>Not Found</div>} />
      </AnimatedSwitch>
    </Router>
  );
};

export default Navigation;
