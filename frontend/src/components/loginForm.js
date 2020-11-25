import React, { Component } from 'react';

export default class LoginForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onLogin}>
        <input type="email" name="email" placeholder="email" required></input>
        <input type="password" name="password" placeholder="password" required></input>
        <button>Login</button>
      </form>
    );
  }
}