import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';


import './Auth.scss';

class Auth extends React.Component {
  logInClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render() {
    return (
      <div className="Auth">
        <h1>AUTH</h1>
        <button className="btn btn-outline-danger" onClick={this.logInClickEvent}>Log in with Google</button>
      </div>
    );
  }
}

export default Auth;
