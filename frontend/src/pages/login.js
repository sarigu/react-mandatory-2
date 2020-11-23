import React, { Component } from 'react';
import LoginForm from '../components/loginForm';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    render() {
        return (
            <div>
                <h1>Login</h1>
                <LoginForm onLogin={this.props.onLogin}></LoginForm>
                <Link to="/signup">Create an account here</Link>
            </div>
        );

    }
}