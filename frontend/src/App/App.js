import React from 'react';
import './App.css';
import SignUp from '../pages/signup';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isAuthorized: "false",
    }
  }

  componentDidMount = () => {
    axios.get('/getSession').then(response =>
      response.status === 200 ? this.setState({ isAuthorized: "true" }) : this.setState({ isAuthorized: "false" })
    );
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact>
              <Login></Login>
            </Route>
            <Route path="/signup" exact>
              <SignUp onCreateAccount={this.handleSignUp} />
            </Route>
            <Route path="/dashboard" exact>
              <Dashboard isAuth={this.state.isAuthorized} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
