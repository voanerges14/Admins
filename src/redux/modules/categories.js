const ADD_START_CATEGORY = 'redux-example/categories/ADD_START_CATEGORY';
const ADD_STOP_CATEGORY = 'redux-example/categories/ADD_STOP_CATEGORY';
const ADD_CATEGORY = 'redux-example/categories/ADD_CATEGORY';
const ADD_SUCCESS_CATEGORY = 'redux-example/categories/ADD_SUCCESS_CATEGORY';
const ADD_FAIL_CATEGORY = 'redux-example/categories/ADD_FAIL_CATEGORY';
const EDIT_START_CATEGORY = 'redux-example/categories/EDIT_START_CATEGORY';
const EDIT_STOP_CATEGORY = 'redux-example/categories/EDIT_STOP_CATEGORY';
const EDIT_CATEGORY = 'redux-example/categories/EDIT_CATEGORY';
const EDIT_SUCCESS_CATEGORY = 'redux-example/categories/EDIT_SUCCESS_CATEGORY';
const EDIT_FAIL_CATEGORY = 'redux-example/categories/EDIT_FAIL_CATEGORY';
const DELETE_START_CATEGORY = 'redux-example/categories/DELETE_START_CATEGORY';
const DELETE_STOP_CATEGORY = 'redux-example/categories/DELETE_STOP_CATEGORY';
const DELETE_CATEGORY = 'redux-example/categories/DELETE_CATEGORY';
const DELETE_SUCCESS_CATEGORY = 'redux-example/categories/DELETE_SUCCESS_CATEGORY';
const DELETE_FAIL_CATEGORY = 'redux-example/categories/DELETE_FAIL_CATEGORY';

const ADD_START_PROPERTY = 'redux-example/categories/ADD_START_PROPERTY';
const ADD_STOP_PROPERTY = 'redux-example/categories/ADD_STOP_PROPERTY';
const ADD_PROPERTY = 'redux-example/categories/ADD_PROPERTY';
const ADD_SUCCESS_PROPERTY = 'redux-example/categories/ADD_SUCCESS_PROPERTY';
const ADD_FAIL_PROPERTY = 'redux-example/categories/ADD_FAIL_PROPERTY';
const EDIT_START_PROPERTY = 'redux-example/categories/EDIT_START_PROPERTY';
const EDIT_STOP_PROPERTY = 'redux-example/categories/EDIT_STOP_PROPERTY';
const EDIT_PROPERTY = 'redux-example/categories/EDIT_PROPERTY';
const EDIT_SUCCESS_PROPERTY = 'redux-example/categories/EDIT_SUCCESS_PROPERTY';
const EDIT_FAIL_PROPERTY = 'redux-example/categories/EDIT_FAIL_PROPERTY';
const DELETE_START_PROPERTY = 'redux-example/categories/DELETE_START_PROPERTY';
const DELETE_STOP_PROPERTY = 'redux-example/categories/DELETE_STOP_PROPERTY';
const DELETE_PROPERTY = 'redux-example/categories/DELETE_PROPERTY';
const DELETE_SUCCESS_PROPERTY = 'redux-example/categories/DELETE_SUCCESS_PROPERTY';
const DELETE_FAIL_PROPERTY = 'redux-example/categories/DELETE_FAIL_PROPERTY';

const LOAD = 'redux-example/categories/LOAD';
const LOAD_SUCCESS = 'redux-example/categories/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/categories/LOAD_FAIL';
const TOGGLED = 'redux-example/categories/TOGGLED';
const CHANGE_SHOW = 'redux-example/categories/CHANGE_SHOW';

const initialState = {
  loaded: false,
  addCategory: {'isActive': false},
  editCategory: {'isActive': false},
  deleteCategory: {'isActive': false},
  addProperty: {'isActive': false},
  editProperty: {'isActive': false},
  deleteProperty: {'isActive': false},
  error: [],
  categoryTreeState: {},
  show: false,
  types: [ 'choose type', 'string', 'color', 'number']
};

// function findProperty(propery, data) {
//   for (let index =0; index < data.length; index++)
//
// }

function localEditProperty(property, data, oldProp) {
  data.map(category => {
    category.properties.map(prop => {
      if (prop.name === oldProp) {
        const propertyE = category.properties;
        propertyE.splice(propertyE.indexOf(prop), 1, property);
        return true;
      }
    });

    let children = category.children;
    if (!Array.isArray(children)) {
      children = children ? [children] : [];
    }
    localEditProperty(property, children, oldProp);
  });
}

function localAddProperty(propertyA, id, data) {
  data.map(category => {
    if (category._id === id) {
      category.properties.push(propertyA);
      return true;
    }
    let children = category.children;
    if (!Array.isArray(children)) {
      children = children ? [children] : [];
    }
    localAddProperty(propertyA, id, children);
  });
}

function localDeleteProperty(name, data) {
  data.map(category => {
    category.properties.map(prop => {
      if (prop.name === name) {
        const propertyE = category.properties;
        propertyE.splice(propertyE.indexOf(prop), 1);
        return true;
      }
    });

    let children = category.children;
    if (!Array.isArray(children)) {
      children = children ? [children] : [];
    }
    localDeleteProperty(name, children);
  });
}

function localAdd(category, data) {
  for (let node = 0; node < data.length; node++) {
    if (category.parentId === '0') {
      data.push(category);
      return true;
    }
    if (data[node]._id === category.parentId) {
      if (!(typeof data[node].children === 'undefined')) {
        data[node].children.push(category);
      } else {
        data[node] = {
          '_id': data[node]._id,
          'parentId': data[node].parentId,
          'name': data[node].name,
          'properties': data[node].properties,
          'children': [category]
        };
      }
      return true;
    }
    let children = data[node].children;
    if (!Array.isArray(children)) {
      children = children ? [children] : [];
    }
    localAdd(category, children);
  }
}

function localDelete(id, data) {
  for (let node = 0; node < data.length; node++) {
    if (data[node]._id === id) {
      data.splice(node, 1);
      return true;
    }
    let children = data[node].children;
    if (!Array.isArray(children)) {
      children = children ? [children] : [];
    }
    localDelete(id, children);
  }
}

function localEdit(category, data) {
  for (let node = 0; node < data.length; node++) {
    if (data[node]._id === category.id) {
      data[node].name = category.name;
      return true;
    }
    let children = data[node].children;
    if (!Array.isArray(children)) {
      children = children ? [children] : [];
    }
    localEdit(category, children);
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLED:
      return {
        ...state,
        categoryTreeState: {
          ...state.categoryTreeState,
          [action.id]: !action.oldState
        }
      };
    case CHANGE_SHOW:
      return {
        ... state,
        show: !action.show
      };

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
      };
    case LOAD_FAIL:
      const loadError = [...state.error];
      loadError.push('error load: ' + action.error);
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: loadError
      };
    case ADD_CATEGORY:
      return state;
    case ADD_SUCCESS_CATEGORY:
      const data = [...state.data];
      const category = action.result;
      localAdd(category, data);
      return {
        ...state,
        data: data,
        addCategory: {'isActive': false}
      };
    case ADD_FAIL_CATEGORY:
      const addCategoryError = [...state.error];
      addCategoryError.push('error addCategory: ' + action.error);
      return {
        ...state,
        error: addCategoryError
      };
    case EDIT_CATEGORY:
      return state;
    case EDIT_SUCCESS_CATEGORY:
      const dataEd = [...state.data];
      const categoryEd = action.category;
      localEdit(categoryEd, dataEd);
      return {
        ...state,
        data: dataEd,
        editCategory: {'isActive': false}
      };
    case EDIT_FAIL_CATEGORY:
      const editCategoryError = [...state.error];
      editCategoryError.push('error editCategory: ' + action.error);
      return {
        ...state,
        error: editCategoryError
      };
    case DELETE_CATEGORY:
      return state;
    case DELETE_SUCCESS_CATEGORY:
      const dataDel = [...state.data];
      const deleteCategoryInfo = {...state.deleteCategory};
      localDelete(deleteCategoryInfo.id, dataDel);
      return {
        ...state,
        data: dataDel,
        deleteCategory: {'isActive': false}
      };
    case DELETE_FAIL_CATEGORY:
      const deleteCategoryError = [...state.error];
      deleteCategoryError.push('error editCategory: ' + action.error);
      return {
        ...state,
        error: deleteCategoryError
      };
    case ADD_PROPERTY:
      return state;
    case ADD_SUCCESS_PROPERTY:
      const dataAddProp = [...state.data];
      const propA = action.property;
      const id = action.id;
      localAddProperty(propA, id, dataAddProp);
      return {
        ...state,
        // data: action.result.data,
        addProperty: {'isActive': false}
      };
    case ADD_FAIL_PROPERTY:
      const addPropertyError = [...state.error];
      addPropertyError.push('error addProperty: ' + action.error);
      return {
        ...state,
        error: addPropertyError
      };
    case EDIT_PROPERTY:
      return state;
    case EDIT_SUCCESS_PROPERTY:
      const dataEditProp = [...state.data];
      const propertyE = action.property;
      const oldProp = action.oldProp;
      localEditProperty(propertyE, dataEditProp, oldProp);
      return {
        ...state,
        // data: action.result.data,
        data: dataEditProp,
        editProperty: {'isActive': false}
      };
    case EDIT_FAIL_PROPERTY:
      const editPropertyError = [...state.error];
      editPropertyError.push('error editProperty: ' + action.error);
      return {
        ...state,
        error: editPropertyError
      };
    case DELETE_PROPERTY:
      return state;
    case DELETE_SUCCESS_PROPERTY:
      const dataDelProp = [...state.data];
      const nameDel = action.name;
      localDeleteProperty(nameDel, dataDelProp);
      return {
        ...state,
        // data: action.result.data,
        data: dataDelProp,
        deleteProperty: {'isActive': false}
      };
    case DELETE_FAIL_PROPERTY:
      const deletePropertyError = [...state.error];
      deletePropertyError.push('error editProperty: ' + action.error);
      return {
        ...state,
        error: deletePropertyError
      };


    case ADD_START_CATEGORY:
      return {
        ...state,
        addCategory: {'isActive': true, 'parentId': action.parentId}
      };
    case ADD_STOP_CATEGORY:
      return {
        ...state,
        addCategory: {'isActive': false}
      };
    case EDIT_START_CATEGORY:
      return {
        ...state,
        editCategory: {'isActive': true, 'id': action.id, 'name': action.name}
      };
    case EDIT_STOP_CATEGORY:
      return {
        ...state,
        editCategory: {'isActive': false}
      };
    case DELETE_START_CATEGORY:
      return {
        ...state,
        deleteCategory: {'isActive': true, 'id': action.id}
      };
    case DELETE_STOP_CATEGORY:
      return {
        ...state,
        deleteCategory: {'isActive': false}
      };
    case ADD_START_PROPERTY:
      return {
        ...state,
        addProperty: {'isActive': true, 'id': action.id}
      };
    case ADD_STOP_PROPERTY:
      return {
        ...state,
        addProperty: {'isActive': false}
      };
    case EDIT_START_PROPERTY:
      return {
        ...state,
        editProperty: {'isActive': true, 'name': action.name, 'id': action.id}
      };
    case EDIT_STOP_PROPERTY:
      return {
        ...state,
        editProperty: {'isActive': false}
      };
    case DELETE_START_PROPERTY:
      return {
        ...state,
        deleteProperty: {'isActive': true, 'name': action.name, 'id': action.id}
      };
    case DELETE_STOP_PROPERTY:
      return {
        ...state,
        deleteProperty: {'isActive': false}
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

export function addCategory(category) {
  return {
    types: [ADD_CATEGORY, ADD_SUCCESS_CATEGORY, ADD_FAIL_CATEGORY],
    promise: (client) => client.post('/category/add', {
      data: {category}
    })
  };
}
export function editCategory(category) {
  return {
    types: [EDIT_CATEGORY, EDIT_SUCCESS_CATEGORY, EDIT_FAIL_CATEGORY],
    category: category,
    promise: (client) => client.post('/category/edit', {
      data: {category}
    })
  };
}
export function deleteCategory(id) {
  return {
    types: [DELETE_CATEGORY, DELETE_SUCCESS_CATEGORY, DELETE_FAIL_CATEGORY],
    id: id,
    promise: (client) => client.post('/category/remove', {
      data: {id}
    })
  };
}
export function addProperty(property, id) {
  return {
    types: [ADD_PROPERTY, ADD_SUCCESS_PROPERTY, ADD_FAIL_PROPERTY],
    property: property,
    id: id,
    promise: (client) => client.post('/category/addProperty', {
      data: {property, id}
    })
  };
}
export function editProperty(property, id, oldProp) {
  return {
    types: [EDIT_PROPERTY, EDIT_SUCCESS_PROPERTY, EDIT_FAIL_PROPERTY],
    oldProp: oldProp,
    id: id,
    property: property,
    promise: (client) => client.post('/category/editProperty', {
      data: {property, id, oldName: oldProp}
    })
  };
}
export function deleteProperty(id, name) {
  return {
    types: [DELETE_PROPERTY, DELETE_SUCCESS_PROPERTY, DELETE_FAIL_PROPERTY],
    name: name,
    id: id,
    promise: (client) => client.post('/category/deleteProperty', {
      data: {id, name}
    })
  };
}

export function addStartCategory(parentId) {
  return {type: ADD_START_CATEGORY, parentId};
}
export function addStopCategory() {
  return {type: ADD_STOP_CATEGORY};
}
export function editStartCategory(id, name) {
  return {type: EDIT_START_CATEGORY, id, name};
}
export function editStopCategory() {
  return {type: EDIT_STOP_CATEGORY};
}
export function deleteStartCategory(id) {
  return {type: DELETE_START_CATEGORY, id};
}
export function deleteStopCategory() {
  return {type: DELETE_STOP_CATEGORY};
}

export function addStartProperty(id) {
  return {type: ADD_START_PROPERTY, name, id};
}
export function addStopProperty() {
  return {type: ADD_STOP_PROPERTY};
}
export function editStartProperty(name, id) {
  return {type: EDIT_START_PROPERTY, name, id};
}
export function editStopProperty() {
  return {type: EDIT_STOP_PROPERTY};
}
export function deleteStartProperty(name, id) {
  return {type: DELETE_START_PROPERTY, name, id};
}
export function deleteStopProperty() {
  return {type: DELETE_STOP_PROPERTY};
}

export function toggledChange(id, oldState) {
  return {type: TOGGLED, id, oldState};
}
export function changeShow(show) {
  return {type: CHANGE_SHOW, show};
}
