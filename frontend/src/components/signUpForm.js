import React, { Component } from 'react';

export default class SignUpForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onCreateAccount}>
                <input type="text" name="first_name" placeholder="first name"></input>
                <input type="text" name="last_name" placeholder="last name"></input>
                <input type="email" name="email" placeholder="email"></input>
                <input type="password" name="password" placeholder="password"></input>
                <button>Create Account</button>
            </form>
        );

    }
}