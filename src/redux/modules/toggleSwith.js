const TOGGLE_MESSAGE = 'ToggleSwitch/TOGGLE_MESSAGE';

const initialState = {
  show: false,
};

export default function onToggelSwith(state = initialState, action = {}) {
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

