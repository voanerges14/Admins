const LOGIN = 'redux/modules/authA/LOGIN';
const LOGIN_SUCCESS = 'redux/modules/authA/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux/modules/authA/LOGIN_FAIL';

const LOGOUT = 'redux/modules/authA/LOGOUT';
const LOGOUT_SUCCESS = 'redux/modules/authA/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux/modules/authA/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return { ...state, loggingIn: true };

    case LOGIN_SUCCESS:
      return { ...state, loggingIn: false, user: action.result };

    case LOGIN_FAIL:
      return { ...state, loggingIn: false, user: null, loginError: action.error };

    case LOGOUT:
      return { ...state, loggingOut: true };

    case LOGOUT_SUCCESS:
      return { ...state, loggingOut: false, user: null };

    case LOGOUT_FAIL:
      return { ...state, loggingOut: false, logoutError: action.error };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function login(name, passwd) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        name: name,
        passwd: passwd
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}
