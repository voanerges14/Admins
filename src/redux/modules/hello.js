const TOGGLE = 'hello/TOGGLE';
const initialState = {
  show: false
  // message: 'Hello world!!!'
};

export default function hello(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE:
      return {
        ... state,
        show: !action.show
      };
    default:
      return state;
  }
}

export function showM(show) {
  return {
    type: TOGGLE, show
  };
}
