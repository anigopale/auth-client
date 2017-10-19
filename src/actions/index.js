import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = `http://localhost:3090/signin`;

export function signinUser({ email, password }) {
  return function(dispatch) {
    // submit email/password to server
    axios.post({ROOT_URL}, { email, password })
      .then(response => {
        // if request is good,
        // - update state to indicate user is auth'ed
        dispatch({ type: AUTH_USER });
        // - save JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        //if request is bad..
        // show an error to user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function authError(error) {
  return {
    type:AUTH_ERROR,
    payload: error
  }
}
