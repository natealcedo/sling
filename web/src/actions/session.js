import { reset } from "redux-form";
import { Socket } from "phoenix";
import api from "../api";
import { fetchUserRooms } from "./rooms";

const API_URL = process.env.REACT_APP_API_URL;
const WEBSOCKET_URL = API_URL.replace(/(http|https)/, 'ws').replace('/api', '');

function connectToSocket(dispatch) {
  const token = localStorage.getItem('token');
  const socket = new Socket(`${WEBSOCKET_URL}/socket`, {
    params: { token },
    // eslint-disable-next-line
    logger: (kind, msg, data) => console.log(`${kind}: ${msg} ${data}`)
  });
  socket.connect();
  dispatch({ type: 'SOCKET_CONNECTED', socket })
}

function setCurrentUser(dispatch, response) {
  localStorage.setItem('token', response.meta.jwt);
  dispatch({
    type: 'AUTHENTICATION_SUCCESS', response
  })
  console.log(response)
  dispatch(fetchUserRooms(response.id));
  connectToSocket(dispatch)
}

export function authenticate(history) {
  return dispatch => api.post('/sessions/refresh')
    .then(response => {
      setCurrentUser(dispatch, response)
    }).catch(() => {
      localStorage.removeItem('token');
      history.push('/login')
    })
}

export function login(data, history) {
  return dispatch => api.post('/sessions', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('login'));
      history.push('/');
    });
}

export function signup(data, history) {
  return dispatch => api.post('/users', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('signup'));
      history.push('/');
    });
}

export function logout(history) {
  return dispatch => api.delete('/sessions')
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
      history.push('/login');
    });
}

export const unauthenticate = () => ({ type: 'AUTHENTICATION_FAILURE' });