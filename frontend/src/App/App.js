import React from 'react';
import './App.css';
import axios from 'axios';
import SignUp from '../pages/signup';
import Login from '../pages/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {

  handleSignUp = (e) => {
    e.preventDefault();
    const { first_name, last_name, email, password } = e.target;
    const newUser = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value
    }

    axios.post('/createAccount', newUser).then(response =>
      console.log("account created")
    );
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const user = { email: email.value, password: password.value };
    axios.post('/login', user).then(response =>
      console.log("account login")
    );

  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact>
              <Login onLogin={this.handleLogin}></Login>
            </Route>
            <Route path="/signup" exact>
              <SignUp onCreateAccount={this.handleSignUp} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
