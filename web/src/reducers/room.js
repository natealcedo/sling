const initialState = {
  channel: null,
  currentRoom: {},
  messages: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ROOM_CONNECTED_TO_CHANNEL':
      return {
        ...state,
        channel: action.channel,
        currentRoom: action.response.room,
        messages: action.response.messages.reverse()
      };
    case 'MESSAGE_CREATED': // new case
      return {
        ...state,
        messages: [
          ...state.messages,
          action.message,
        ],
      };
    case 'USER_LEFT_ROOM':
      return initialState;
    default:
      return state;
  }
}