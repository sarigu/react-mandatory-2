import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/logout';

export default class AnotherTestPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.isAuth)
        return (
            <div>
                {this.props.isAuth === "true" ?
                    <div>
                        <Logout ></Logout>
                        <h1>Another test page with no content</h1>
                        <Link to="/dashboard">See your dashboard</Link>
                        <br></br>
                        <Link to="/test">See a test page</Link>
                    </div>
                    : <Link to="/">Please log in</Link>}
            </div>
        );

    }
}