import React from 'react';
import './App.css';
import axios from 'axios';
import SignUp from '../pages/signUp';

class App extends React.Component {

  handleSubmit = (e) => {
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

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <SignUp onCreateAccount={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
