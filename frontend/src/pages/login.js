import React, { Component } from 'react';
import LoginForm from '../components/loginForm';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {

    handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        const user = { email: email.value, password: password.value };
        axios.post('/login', user).then(response =>
            response ? window.location = '/dashboard' : console.log("sorry try again")
        );

    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <LoginForm onLogin={this.handleLogin}></LoginForm>
                <Link to="/signup">Create an account here</Link>
            </div>
        );

    }
}