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
const CHANGE_ADMIN_ADD = 'redux/modules/users/CHANGE_ADMIN_ADD';
const CHANGE_ADMIN_EDIT = 'redux/modules/users/CHANGE_ADMIN_EDIT';

const initialState = {
  loaded: false,
  editBtn: {},
  deleteBtn: {},
  addBtn: false,
  errorList: [],
  isAdminAdd: false,
  isAdminEdit: {}
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
      const errLOAD = state.errorList;
      errLOAD.push({'ADD_FAIL': action.error});
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        loadError: errLOAD
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
      const editData = [...state.data];
      let isAdminDefault = false;
      for (let index = 0; index < editData.length; ++index) {
        if (editData[index].id === action.id) {
          isAdminDefault = editData[index].admin;
          break;
        }
      }
      return {
        ...state,
        editBtn: {
          ...state.editBtn,
          [action.id]: true
        },
        isAdminEdit: {
          ...state.isAdminEdit,
          [action.id]: isAdminDefault
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
    case
    ADD_OK:
      const dataADD = [...state.data];
      const user = {
        id: action.result.id,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        admin: action.isAdmin
      };
      dataADD.push(user);
      return {
        ...state,
        data: dataADD,
        addBtn: false
      };
    case ADD_FAIL:
      const errADD = state.errorList;
      errADD.push({'ADD_FAIL': action.error});
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
          dataEDIT[index] = {
            'id': action.user.id,
            'firstName': action.user.firstName,
            'lastName': action.user.lastName,
            'email': action.user.email,
            'phone': action.user.phone,
            'address': action.user.address,
            'admin': action.admin
          };
          break;
        }
      }
      return {
        ...state,
        data: dataEDIT,
        editBtn: {
          ...state.editBtn,
          [action.result.id]: false
        }
      };
    case EDIT_FAIL:
      const errEDIT = state.errorList;
      errEDIT.push({'EDIT_FAIL': action.error});
      return {
        ...state,
        errorList: errEDIT
      };
    case DELETE:
      return state;
    case DELETE_OK:
      const dataDELETE = [...state.data];
      for (let index = 0; index < dataDELETE.length; ++index) {
        if (dataDELETE[index].id === action.result.id) {
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
      errDELETE.push({'DELETE_FAIL': action.error});
      return {
        ...state,
        errorList: errDELETE
      };
    case CHANGE_ADMIN_ADD:
      return {
        ...state,
        isAdminAdd: !action.admin
      };
    case CHANGE_ADMIN_EDIT:
      return {
        ...state,
        isAdminEdit: {
          ...state.isAdminEdit,
          [action.id]: !action.admin
        }
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  debugger;
  return globalState.users && globalState.users.loaded;
}
export function load() {
  return { types: [LOAD, LOAD_OK, LOAD_FAIL],
    promise: (client) => client.get('/users/get')
  };
}
export function addUser(user, admin) {
  return { types: [ADD, ADD_OK, ADD_FAIL],
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: admin,
    promise: (client) => client.post('/users/add', { data: {'user': user, 'isAdmin': admin} })
  };
}
export function editUser(values, admin) {
  return { types: [EDIT, EDIT_OK, EDIT_FAIL], user: values, admin: admin,
    promise: (client) => client.post('/users/edit', { data: {'user': values, 'admin': admin} })
  };
}
export function deleteUser(id) {
  return { types: [DELETE, DELETE_OK, DELETE_FAIL],
    promise: (client) => client.post('/users/deleteUser', { data: {'id': id} })
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

export function changeAdminAdd(admin) {
  return { type: CHANGE_ADMIN_ADD, admin };
}
export function changeAdminEdit(id, admin) {
  return { type: CHANGE_ADMIN_EDIT, id, admin };
}
