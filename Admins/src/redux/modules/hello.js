const TOGGLE_MESSAGE = 'hello/TOGGLE_MESSAGE';

const initialState = {
  show: false,
  message: 'Hello world!!!'
};

export default function hello(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_MESSAGE:
      return {
        ... state,
        show: action.show
      };
    default:
      return state;
  }
}

export function showMessage(show) {
  return {
    type: TOGGLE_MESSAGE,
    show
  };
}
