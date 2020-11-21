import React, { Component } from 'react';
import SignUpForm from '../components/signUpForm';
import { Link } from 'react-router-dom';

export default class SignUp extends Component {
    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <SignUpForm onCreateAccount={this.props.onCreateAccount}></SignUpForm>
                <Link to="/">Already have an account? Log in</Link>
            </div>
        );

    }
}