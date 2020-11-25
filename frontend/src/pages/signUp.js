import React, { Component } from 'react';
import SignUpForm from '../components/signUpForm';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class SignUp extends Component {

    handleSignUp = (e) => {
        e.preventDefault();
        const { first_name, last_name, email, password } = e.target;
        const newUser = {
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            password: password.value
        }

        axios.post('/users', newUser).then(response =>
            console.log(response)
        );

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <SignUpForm onCreateAccount={this.handleSignUp}></SignUpForm>
                <Link to="/">Already have an account? Log in</Link>
            </div>
        );
    }
}