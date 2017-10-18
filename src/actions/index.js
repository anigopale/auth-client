import axios from 'axios';

const ROOT_URL = `http://localhost:3090`;

export function signinUser({ email, password }) {
  return function(dispatch) {
    // submit email/password to server
    axios.post(`{$ROOT_URL}/signin`, { email, password });

    // if request is good,
    // update state to indicate user is auth'ed
    // save JWT token
    // redirect to route /feature

    //if request is bad..
    // show an error to user
  }
}
