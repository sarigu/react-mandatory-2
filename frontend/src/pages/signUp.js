import React, { Component } from 'react';

export default class SignUp extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.onCreateAccount}>
                    <input type="text" name="first_name" placeholder="first name"></input>
                    <input type="text" name="last_name" placeholder="last name"></input>
                    <input type="text" name="email" placeholder="email"></input>
                    <input type="text" name="password" placeholder="password"></input>
                    <button>Create Account</button>
                </form>
            </div>
        );

    }
}