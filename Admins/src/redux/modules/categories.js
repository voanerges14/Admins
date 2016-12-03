/**
 * Created by pavlo on 09.11.16.
 */
const LOAD = 'redux-example/categories/LOAD';
const LOAD_SUCCESS = 'redux-example/categories/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/categories/LOAD_FAIL';
const EDIT_START = 'redux-example/categories/EDIT_START';
const EDIT_STOP = 'redux-example/categories/EDIT_STOP';
const SAVE = 'redux-example/categories/SAVE';
const SAVE_SUCCESS = 'redux-example/categories/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/categories/SAVE_FAIL';

const SAVE_PROP = 'redux-example/categories/SAVE_PROP';
const SAVE_SUCCESS_PROP = 'redux-example/categories/SAVE_SUCCESS_PROP';
const SAVE_FAIL_PROP = 'redux-example/categories/SAVE_FAIL_PROP';

const ADD = 'redux-example/categories/ADD';
const ADD_SUCCESS = 'redux-example/categories/ADD_SUCCESS';
const ADD_FAIL = 'redux-example/categories/ADD_FAIL';

const ADD_PROP = 'redux-example/categories/ADD_PROP';
const ADD_SUCCESS_PROP = 'redux-example/categories/ADD_SUCCESS_PROP';
const ADD_FAIL_PROP = 'redux-example/categories/ADD_FAIL_PROP';

const DELETE_START = 'redux-example/categories/DELETE_START';
const DELETE_STOP = 'redux-example/categories/DELETE_STOP';
const ADD_START = 'redux-example/categories/ADD_START';
const ADD_STOP = 'redux-example/categories/ADD_STOP';

const ADD_START_PROP = 'redux-example/categories/ADD_START_PROP';
const ADD_STOP_PROP = 'redux-example/categories/ADD_STOP_PROP';
const DELETE_START_PROP = 'redux-example/categories/DELETE_START_PROP';
const DELETE_STOP_PROP = 'redux-example/categories/DELETE_STOP_PROP';
const EDIT_START_PROP = 'redux-example/categories/EDIT_START_PROP';
const EDIT_STOP_PROP = 'redux-example/categories/EDIT_STOP_PROP';

const initialState = {
  loaded: false,
  adding: [false],
  // addFormOpen: false,
  onDelete: {},
  editing: {},
  editingProp: {},
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };


    case EDIT_START_PROP:
      return {
        ...state,
        editingProp: {
          ...state.editingProp,
          [action.name]: true
        }
      };
    case EDIT_STOP_PROP:
      return {
        ...state,
        editingProp: {
          ...state.editingProp,
          [action.name]: false
        }
      };

    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = [...state.data];
      data[action.result.id - 1] = action.result;
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;

    case SAVE_PROP:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS_PROP:
      debugger;
      const dataProp = [...state.data];
      // const data = [...state.data];
      for (let index = 0; index < dataProp.length; index++) {
        if (dataProp[index]._id === action.result.idC) {
          for (let indexj = 0; indexj < dataProp[index].properties.length; indexj++) {
            if (dataProp[index].properties[indexj].name === action.result.nameOld) {
              dataProp[index].properties[indexj] = action.result.prop;
            }
          }
        }
      }
      return {
        ...state,
        data: dataProp,
        editingProp: {
          ...state.editingProp,
          [action.result.nameOld]: false
        },
        saveError: {
          ...state.saveError,
          [action.result.nameOld]: null
        }
      };
    case SAVE_FAIL_PROP:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.name]: action.error
        }
      } : state;


    case DELETE_START:
      return {
        ...state,
        onDelete: {
          ...state.editing,
          [action.id]: true
        }
      };

    case DELETE_START_PROP:
      return {
        ...state,
        onDelete: {
          ...state.editing,
          [action.id]: true
        }
      };

    case ADD_START:
      return {
        ...state,
        adding: [true, action.id]
      };
    case ADD_STOP:
      return {
        ...state,
        adding: [false]
      };

    case ADD_START_PROP:
      return {
        ...state,
        adding: [true, action.id]
      };
    case ADD_STOP_PROP:
      return {
        ...state,
        adding: [false]
      };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.categories && globalState.categories.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/category/load') // params not used, just shown as demonstration
  };
}

export function save(category) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: category.id,
    promise: (client) => client.post('/category/update', {
      data: category
    })
  };
}

export function saveProp(idC, prop, nameOld) {
  return {
    id: prop.name,
    types: [SAVE_PROP, SAVE_SUCCESS_PROP, SAVE_FAIL_PROP],
    promise: (client) => client.post('/category/updateProp', {
      data: {prop, idC, nameOld}
    })
  };
}

export function add(category) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post('/category/add', {
      data: category
    })
  };
}
// export function addProp(values, id) {
export function addProp(values) {
  return {
    types: [ADD_PROP, ADD_SUCCESS_PROP, ADD_FAIL_PROP],
    promise: (client) => client.post('/category/addProp', {
      data: values
    })
  };
}

export function addStart(id) {
  return {type: ADD_START, id};
}

export function addStop() {
  return {type: ADD_STOP};
}

export function addStartProp(id) {
  return {type: ADD_START_PROP, id};
}

export function addStopProp() {
  return {type: ADD_STOP_PROP};
}

export function deleteStart(id) {
  return {type: DELETE_START, id};
}

export function deleteStop(id) {
  return {type: DELETE_STOP, id};
}

export function deleteStartProp(id) {
  return {type: DELETE_START_PROP, id};
}

export function deleteStopProp(id) {
  return {type: DELETE_STOP_PROP, id};
}

export function editStart(id) {
  return {type: EDIT_START, id};
}

export function editStop(id) {
  return {type: EDIT_STOP, id};
}

export function editStartProp(name) {
  return {type: EDIT_START_PROP, name};
}

export function editStopProp(name) {
  return {type: EDIT_STOP_PROP, name};
}

