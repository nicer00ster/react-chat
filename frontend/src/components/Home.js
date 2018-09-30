import React, { Component } from 'react';
import { verifyToken, setToken } from '../utils/storage';
import 'whatwg-fetch';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      errors: {
        registerError: '',
        loginError: ''
      }
    };
  }

  componentDidMount() {
    const obj = verifyToken('app');
    console.log(obj);
    if(obj && obj.token) {
      const { token } = obj;
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if(data.success) {
            this.setState({ token, isLoading: false })
          } else {
            this.setState({ isLoading: false })
          }
        })
    } else {
      this.setState({ isLoading: false })
    }
  }

  onRegister() {
    // e.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    fetch('/api/account/register', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
  }

  onLogin() {
    const { email, password } = this.state;
    this.setState({ isLoading: true });

    fetch('/api/account/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setToken('app', { token: data.token })
      this.setState({
        isLoading: false,
        email,
        password: '',
        token: data.token,
      })
    })
  }

  onLogout() {
    this.setState({ isLoading: true })
    const obj = verifyToken('app');
    if(obj && obj.token) {
      const { token } = obj;
      fetch('/api/account/logout?token=' + token)
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          this.setState({ token: '', isLoading: false })
        } else {
          this.setState({ isLoading: false })
        }
      })
    } else {
      this.setState({ isLoading: false })
    }
  }


  render() {
    const { isLoading, token } = this.state;
    if(isLoading) {
      return (
        <div>
          <em>Loading...</em>
        </div>
      )
    }
    if(!token) {
      return (
        <div>
            <p>Login</p>
            <label>Email:</label><br />
            <input onChange={(e) => this.setState({ email: e.target.value })} type="email" placeholder="Email" />
            <label>Password:</label><br />
            <input onChange={(e) => this.setState({ password: e.target.value })} type="password" placeholder="Password" />
            <button onClick={() => this.onLogin()}>Login</button>
          <br />
          <br />
            <p>Sign Up</p>
            <label>First Name:</label><br />
            <input onChange={(e) => this.setState({ firstName: e.target.value })} type="text" placeholder="First Name" />
            <label>Last Name:</label><br />
            <input onChange={(e) => this.setState({ lastName: e.target.value })} type="text" placeholder="Last name" />
            <label>Email:</label><br />
            <input onChange={(e) => this.setState({ email: e.target.value })} type="email" placeholder="Email" />
            <label>Password:</label><br />
            <input onChange={(e) => this.setState({ password: e.target.value })} type="password" placeholder="Password" />
            <button onClick={() => this.onRegister()}>Sign Up</button>
        </div>
      )
    }
    return (
      <div>
        Account
        <button onClick={() => this.onLogout()}>Logout</button>
      </div>
    );
  }
}

export default Home;
