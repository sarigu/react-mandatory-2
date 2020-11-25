import React, { Component } from 'react';
import axios from 'axios';

export default class Logout extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        axios.get("/logout").then(response =>
            console.log(response)
        );
        window.location = '/';
    }

    render() {
        return (
            <div>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );

    }
}