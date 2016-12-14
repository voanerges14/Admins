const ADD_START_PRODUCT = 'redux-example/products/ADD_START_PRODUCT';
const ADD_STOP_PRODUCT = 'redux-example/products/ADD_STOP_PRODUCT';
const ADD_PRODUCT = 'redux-example/products/ADD_PRODUCT';
const ADD_SUCCESS_PRODUCT = 'redux-example/products/ADD_SUCCESS_PRODUCT';
const ADD_FAIL_PRODUCT = 'redux-example/products/ADD_FAIL_PRODUCT';
const EDIT_START_PRODUCT = 'redux-example/products/EDIT_START_PRODUCT';
const EDIT_STOP_PRODUCT = 'redux-example/products/EDIT_STOP_PRODUCT';
const EDIT_PRODUCT = 'redux-example/products/EDIT_PRODUCT';
const EDIT_SUCCESS_PRODUCT = 'redux-example/products/EDIT_SUCCESS_PRODUCT';
const EDIT_FAIL_PRODUCT = 'redux-example/products/EDIT_FAIL_PRODUCT';
const DELETE_START_PRODUCT = 'redux-example/products/DELETE_START_PRODUCT';
const DELETE_STOP_PRODUCT = 'redux-example/products/DELETE_STOP_PRODUCT';
const DELETE_PRODUCT = 'redux-example/products/DELETE_PRODUCT';
const DELETE_SUCCESS_PRODUCT = 'redux-example/products/DELETE_SUCCESS_PRODUCT';
const DELETE_FAIL_PRODUCT = 'redux-example/products/DELETE_FAIL_PRODUCT';
const LOAD = 'redux-example/products/LOAD';
const LOAD_SUCCESS = 'redux-example/products/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/products/LOAD_FAIL';

const SHOW_IMAGE = 'redux-example/products/SHOW_IMAGE';
const DELETE_IMAGE_START = 'redux-example/products/DELETE_IMAGE_START';
const DELETE_IMAGE_STOP = 'redux-example/products/DELETE_IMAGE_STOP';
const DELETE_IMG = 'redux-example/products/DELETE_IMG';
const DELETE_SUCCESS_IMG = 'redux-example/products/DELETE_SUCCESS_IMG';
const DELETE_FAIL_IMG = 'redux-example/products/DELETE_FAIL_IMG';
const ADD_IMAGE_START = 'redux-example/products/DELETE_IMAGE_START';
const ADD_IMAGE_STOP = 'redux-example/products/DELETE_IMAGE_STOP';
const ADD_IMG = 'redux-example/products/ADD_IMG';
const ADD_SUCCESS_IMG = 'redux-example/products/ADD_SUCCESS_IMG';
const ADD_FAIL_IMG = 'redux-example/products/ADD_FAIL_IMG';
const SET_CATEGORY_ID = 'redux-example/products/SET_CATEGORY_ID';

const initialState = {
  loaded: false,
  categoryId: '',
  onAddProduct: {'isActive': false},
  onDeleteProduct: {'isActive': false},
  onEditProduct: {'isActive': false},
  error: [],
  onShowImagePopUp: false,
  onDeleteImage: {'isActive': false},
  onAddProductImage: false
};

export default function products(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CATEGORY_ID:
      return {
        ...state,
        categoryId: action._id
      };
    case SHOW_IMAGE:
      const oldState = [...state.onShowImagePopUp];
      return {
        ...state,
        onShowImagePopUp: !oldState
      };
    case DELETE_IMAGE_START:
      return {
        ...state,
        onDeleteImage: {'isActive': true, '_id': action._id}
      };
    case DELETE_IMAGE_STOP:
      return {
        ...state,
        onDeleteImage: {'isActive': false}
      };
    case DELETE_IMG:
      return state;
    case DELETE_SUCCESS_IMG:
      const dataDelImg = [...state.data];
      for (let index = 0; index < dataDelImg.length; ++index) {
        if (dataDelImg[index]._id === action.result._id) {
          dataDelImg[index].images = action.result.images;
          break;
        }
      }
      return {
        ...state,
        data: dataDelImg,
        onDeleteImage: {'isActive': false}
      };
    case DELETE_FAIL_IMG:
      const imgDeleteError = [...state.error];
      imgDeleteError.push('error deleteImg: ' + action.error);
      return {
        ...state,
        error: imgDeleteError
      };
    case ADD_IMAGE_START:
      return {
        ...state,
        onAddProductImage: true
      };
    case ADD_IMAGE_STOP:
      return {
        ...state,
        onAddProductImage: false
      };
    case ADD_IMG:
      return state;
    case ADD_SUCCESS_IMG:
      const dataAddImg = [...state.data];
      for (let index = 0; index < dataAddImg.length; ++index) {
        if (dataAddImg[index]._id === action.result._id) {
          dataAddImg[index].images.push(action.img);
          break;
        }
      }
      return {
        ...state,
        data: dataAddImg,
      };
    case ADD_FAIL_IMG:
      const deleteImgError = [...state.error];
      deleteImgError.push('error addImg: ' + action.error);
      return {
        ...state,
        error: deleteImgError
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
    case ADD_PRODUCT:
      return state;
    case ADD_SUCCESS_PRODUCT:
      const addProductData = [...state.data];
      addProductData.push(action.result.product);
      return {
        ...state,
        data: addProductData,
        onAddProduct: false
      };
    case ADD_FAIL_PRODUCT:
      const addProductError = [...state.error];
      addProductError.push('error addProduct: ' + action.error);
      return {
        ...state,
        error: addProductError
      };
    case EDIT_PRODUCT:
      return state;
    case EDIT_SUCCESS_PRODUCT:
      const dataEDIT = [...state.data];
      for (let index = 0; index < dataEDIT.length; ++index) {
        if (dataEDIT[index]._id === action.result._id) {
          dataEDIT[index] = action.product;
          break;
        }
      }
      return {
        ...state,
        data: dataEDIT,
        onEditProduct: {'isActive': false}
      };
    case EDIT_FAIL_PRODUCT:
      const editProductError = [...state.error];
      editProductError.push('error editProduct: ' + action.error);
      return {
        ...state,
        error: editProductError
      };
    case DELETE_PRODUCT:
      return state;
    case DELETE_SUCCESS_PRODUCT:
      const dataDelProduct = [...state.data];
      for (let index = 0; index < dataDelProduct.length; ++index) {
        if (dataDelProduct[index].id === action.result.id) {
          dataDelProduct.splice(index, 1);
          break;
        }
      }
      return {
        ...state,
        data: dataDelProduct,
        onDeleteProduct: {'isActive': false}
      };
    case DELETE_FAIL_PRODUCT:
      const deleteProductError = [...state.error];
      deleteProductError.push('error deleteProduct: ' + action.error);
      return {
        ...state,
        error: deleteProductError
      };

    case ADD_START_PRODUCT:
      return {
        ...state,
        onAddProduct: {'isActive': true, 'categoryId': action.categoryId}
      };
    case ADD_STOP_PRODUCT:
      return {
        ...state,
        onAddProduct: {'isActive': false}
      };
    case EDIT_START_PRODUCT:
      return {
        ...state,
        onEditProduct: {'isActive': true, '_id': action._id}
      };
    case EDIT_STOP_PRODUCT:
      return {
        ...state,
        onEditProduct: {'isActive': false}
      };
    case DELETE_START_PRODUCT:
      return {
        ...state,
        onDeleteProduct: {'isActive': true, '_id': action._id}
      };
    case DELETE_STOP_PRODUCT:
      return {
        ...state,
        onDeleteProduct: {'isActive': false}
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.categories && globalState.categories.loaded;
}
export function load(_id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/products/get', {
      data: {_id}
    })
  };
}

export function setCategoryId(_id) {
  return {type: SET_CATEGORY_ID, _id};
}

export function addStartProduct(categoryId) {
  return {type: ADD_START_PRODUCT, categoryId};
}
export function addStopProduct() {
  return {type: ADD_STOP_PRODUCT};
}
export function editStartProduct(_id) {
  return {type: EDIT_START_PRODUCT, _id};
}
export function editStopProduct() {
  return {type: EDIT_STOP_PRODUCT};
}
export function deleteStartProduct(_id) {
  return {type: DELETE_START_PRODUCT, _id};
}
export function deleteStopProduct() {
  return {type: DELETE_STOP_PRODUCT};
}

export function addProduct(product, categoryId) {
  return {
    types: [ADD_PRODUCT, ADD_SUCCESS_PRODUCT, ADD_FAIL_PRODUCT],
    promise: (client) => client.post('/products/add', {
      data: {product, categoryId}
    })
  };
}
export function editProduct(product, _id) {
  debugger;
  return {
    types: [EDIT_PRODUCT, EDIT_SUCCESS_PRODUCT, EDIT_FAIL_PRODUCT],
    product: product,
    promise: (client) => client.post('/products/edit', {
      data: {product, _id}
    })
  };
}
export function deleteProduct(_id) {
  return {
    types: [DELETE_PRODUCT, DELETE_SUCCESS_PRODUCT, DELETE_FAIL_PRODUCT],
    promise: (client) => client.post('/products/remove', {
      data: {_id}
    })
  };
}

export function toggleImg() {
  return {type: SHOW_IMAGE};
}

export function addStartImg() {
  return {type: ADD_IMAGE_START};
}
export function addStopImg() {
  return {type: ADD_IMAGE_STOP};
}
export function deleteStartImg(_id) {
  return {type: DELETE_IMAGE_START, _id};
}
export function deleteStopImg() {
  return {type: DELETE_IMAGE_STOP};
}

export function addImg(img, productId) {
  return {
    types: [ADD_IMG, ADD_SUCCESS_IMG, ADD_FAIL_IMG],
    img: img,
    promise: (client) => client.post('/products/addImg', {
      data: {img, productId}
    })
  };
}
export function deleteImg(_id, img) {
  return {
    types: [DELETE_IMG, DELETE_SUCCESS_IMG, DELETE_FAIL_IMG],
    promise: (client) => client.post('/products/removeImg', {
      data: {_id, img}
    })
  };
}
