import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = `http://localhost:3090/signin`;

export function signinUser({ email, password }) {
  return function(dispatch) {
    // submit email/password to server
    axios.post(ROOT_URL, { email, password })
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

export function signoutUser() {
  // delete token after signout
  localStorage.removeItem('token');

  return { type: UNAUTH_USER }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
      axios.post(`http://localhost:3090/signup`, {email, password})
        .then(respose => {
          dispatch({ type: AUTH_USER });
          localStorage.setItem('token', response.data.token);
          browserHistory.push('/feature');
        })
        .catch(response => dispatch(authError(response.data.error)));
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(`http://localhost:3090`, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then( response => {
        dispatch({
          type:FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}
