import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logout from '../components/logout';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    handleLogout = (e) => {
        e.preventDefault();
        axios.get("/logout").then(response =>
            console.log(response)
        );
        window.location = '/';
    }

    render() {
        console.log(this.props.isAuth)
        return (
            <div>
                {this.props.isAuth === "true" ?
                    <div>
                        <Logout onLogout={this.handleLogout}></Logout>
                        <h1>Hello, this is the dashboard</h1>
                    </div>
                    : <Link to="/">Please log in   </Link>}




            </div>
        );

    }
}