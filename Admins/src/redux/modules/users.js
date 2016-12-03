const LOAD = 'redux/modules/users/LOAD';
const LOAD_OK = 'redux/modules/users/LOAD_SUCCESS';
const LOAD_FAIL = 'redux/modules/users/LOAD_FAIL';
const EDIT = 'redux/modules/users/EDIT';
const EDIT_OK = 'redux/modules/users/EDIT_OK';
const EDIT_FAIL = 'redux/modules/users/EDIT_FAIL';
const ADD = 'redux/modules/users/ADD';
const ADD_OK = 'redux/modules/users/ADD_OK';
const ADD_FAIL = 'redux/modules/users/ADD_FAIL';
const DELETE = 'redux/modules/users/DELETE';
const DELETE_OK = 'redux/modules/users/DELETE_OK';
const DELETE_FAIL = 'redux/modules/users/DELETE_FAIL';
const START_EDIT = 'redux/modules/users/START_EDIT';
const STOP_EDIT = 'redux/modules/users/STOP_EDIT';
const START_ADD = 'redux/modules/users/START_ADD';
const STOP_ADD = 'redux/modules/users/STOP_ADD';
const START_DELETE = 'redux/modules/users/START_DELETE';
const STOP_DELETE = 'redux/modules/users/STOP_DELETE';

const initialState = {
  loaded: false,
  editBtn: {},
  deleteBtn: {},
  addBtn: false,
  errorList: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_OK:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        loadError: action.error
      };
    case START_ADD:
      return {
        ...state,
        addBtn: true
      };
    case STOP_ADD:
      return {
        ...state,
        addBtn: false
      };
    case START_DELETE:
      return {
        ...state,
        deleteBtn: {
          ...state.deleteBtn,
          [action.id]: true
        }
      };
    case STOP_DELETE:
      return {
        ...state,
        deleteBtn: {
          ...state.deleteBtn,
          [action.id]: false
        }
      };
    case START_EDIT:
      return {
        ...state,
        editBtn: {
          ...state.editBtn,
          [action.id]: true
        }
      };
    case STOP_EDIT:
      return {
        ...state,
        editBtn: {
          ...state.editBtn,
          [action.id]: false
        }
      };
    case ADD:
      return state;
    case ADD_OK:
      const dataADD = [...state.data];
      dataADD.push(action.result.user);
      return {
        ...state,
        data: dataADD
      };
    case ADD_FAIL:
      const errADD = state.errorList;
      errADD.push({'ADD_FAIL': action.result});
      return {
        ...state,
        errorList: errADD
      };
    case EDIT:
      return state;
    case EDIT_OK:
      const dataEDIT = [...state.data];
      for (let index = 0; index < dataEDIT.length; ++index) {
        if (dataEDIT[index].id === action.result.id) {
          dataEDIT[index] = action.result.user;
          break;
        }
      }
      return {
        ...state,
        data: dataEDIT
      };
    case EDIT_FAIL:
      const errEDIT = state.errorList;
      errEDIT.push({'EDIT_FAIL': action.result});
      return {
        ...state,
        errorList: errEDIT
      };
    case DELETE:
      return state;
    case DELETE_OK:
      const dataDELETE = [...state.data];
      for (let index = 0; index < dataDELETE.length; ++index) {
        if (dataDELETE[index].id === action.result) {
          dataDELETE.splice(index, 1);
          break;
        }
      }
      return {
        ...state,
        data: dataDELETE
      };
    case DELETE_FAIL:
      const errDELETE = state.errorList;
      errDELETE.push({'DELETE_FAIL': action.result});
      return {
        ...state,
        errorList: errDELETE
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.users && globalState.users.loaded;
}
export function load() {
  return {
    types: [LOAD, LOAD_OK, LOAD_FAIL],
    promise: (client) => client.get('/users/get')
  };
}
export function addUser(user) {
  return {
    types: [ADD, ADD_FAIL, ADD_OK],
    promise: (client) => client.post('/users/add', {
      data: {'user': user}
    })
  };
}
export function editUser(user) {
  return { types: [EDIT, EDIT_FAIL, EDIT_OK],
    promise: (client) => client.post('/users/edit', {
      data: {'user': user}
    })
  };
}
export function deleteUser(id) {
  return { types: [DELETE, DELETE_FAIL, DELETE_OK],
    promise: (client) => client.post('/users/delete', {
      data: {'id': id}
    })
  };
}
export function startAdd() {
  return { type: START_ADD };
}
export function stopAdd() {
  return { type: STOP_ADD };
}
export function startEdit(id) {
  return { type: START_EDIT, id };
}
export function stopEdit(id) {
  return { type: STOP_EDIT, id };
}
export function startDelete(id) {
  return { type: START_DELETE, id };
}
export function stopDelete(id) {
  return { type: STOP_DELETE, id };
}
