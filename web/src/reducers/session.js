const initialState = {
  isAuthenticated: false,
  willAuthenticate: true,
  currentUser: {},
  socket: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATION_REQUEST':
      return {
        ...state,
        willAuthenticate: true,
      };
    case 'AUTHENTICATION_SUCCESS':
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: true,
        currentUser: action.response.data,
      };
    case 'AUTHENTICATION_FAILURE':
      return {
        ...state,
        willAuthenticate: false,
      };

    case 'SOCKET_CONNECTED':
      return {
        ...state,
        socket: action.socket
      };
    case 'LOGOUT':
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: false,
        currentUser: {},
        socket: null,
      };
    default:
      return state;
  }
}