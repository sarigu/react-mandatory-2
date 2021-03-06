import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/logout';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.isAuth === "true" ?
                    <div>
                        <Logout></Logout>
                        <h1>Hello, this is the dashboard</h1>
                        <Link to="/test">See a test page</Link>
                        <br></br>
                        <Link to="/anothertest">See another test page</Link>
                    </div>
                    : <Link to="/">Please log in   </Link>}
            </div>
        );

    }
}