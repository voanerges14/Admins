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

const initialState = {
  loaded: false,
  editing: {},
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

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
