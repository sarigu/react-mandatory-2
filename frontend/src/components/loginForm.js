import React, { Component } from 'react';

export default class LoginForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onLogin}>
        <input type="email" name="email" placeholder="email"></input>
        <input type="password" name="password" placeholder="password"></input>
        <button>Login</button>
      </form>

    );

  }
}