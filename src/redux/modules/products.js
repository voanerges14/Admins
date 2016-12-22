const ADD_START_PRODUCT = 'redux-example/products/ADD_START_PRODUCT';
const ADD_START_PRODUCT_SUCCESS = 'redux-example/products/ADD_START_PRODUCT_SUCCESS';
const ADD_START_PRODUCT_FAIL = 'redux-example/products/ADD_START_PRODUCT_FAIL';
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
const SHOW_DESCRIPTION = 'redux-example/products/SHOW_DESCRIPTION';
const SHOW_PROPERTY = 'redux-example/products/SHOW_PROPERTY';

const DELETE_IMAGE_START = 'redux-example/products/DELETE_IMAGE_START';
const DELETE_IMAGE_STOP = 'redux-example/products/DELETE_IMAGE_STOP';
const DELETE_IMG = 'redux-example/products/DELETE_IMG';
const DELETE_SUCCESS_IMG = 'redux-example/products/DELETE_SUCCESS_IMG';
const DELETE_FAIL_IMG = 'redux-example/products/DELETE_FAIL_IMG';

const ADD_IMAGE_START = 'redux-example/products/ADD_IMAGE_START';
const ADD_IMAGE_STOP = 'redux-example/products/ADD_IMAGE_STOP';
const ADD_IMG = 'redux-example/products/ADD_IMG';
const ADD_SUCCESS_IMG = 'redux-example/products/ADD_SUCCESS_IMG';
const ADD_FAIL_IMG = 'redux-example/products/ADD_FAIL_IMG';

const EDIT_PROPERTY = 'redux-example/products/EDIT_PROPERTY';
const EDIT_SUCCESS_PROPERTY = 'redux-example/products/EDIT_SUCCESS_PROPERTY';
const EDIT_FAIL_PROPERTY = 'redux-example/products/EDIT_FAIL_PROPERTY';
const EDIT_DESCRIPTION = 'redux-example/products/EDIT_DESCRIPTION';
const EDIT_SUCCESS_DESCRIPTION = 'redux-example/products/EDIT_SUCCESS_DESCRIPTION';
const EDIT_FAIL_DESCRIPTION = 'redux-example/products/EDIT_FAIL_DESCRIPTION';

const initialState = {
  loaded: false,
  onAddProduct: {'isActive': false},
  onDeleteProduct: {'isActive': false},
  onEditProduct: {'isActive': false},
  error: [],
  onShowImagePopUp: false,
  onDeleteImage: {'isActive': false},
  onDeleteProperty: {'isActive': false},
  onAddImage: {'isActive': true},
  onAddProductImage: false,
  onDescription: false,
  onProperty: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case EDIT_PROPERTY:
      return state;
    case EDIT_SUCCESS_PROPERTY:
      const dataDeleteProperty = [...state.data];
      for (let index = 0; index < dataDeleteProperty.length; ++index) {
        if (dataDeleteProperty[index]._id === action.id) {
          dataDeleteProperty[index] = action.result.product;
          break;
        }
      }
      return {
        ...state,
        data: dataDeleteProperty
      };
    case EDIT_FAIL_PROPERTY:
      const propertyDeleteError = [...state.error];
      propertyDeleteError.push('error deleteProperty: ' + action.error);
      return {
        ...state,
        error: propertyDeleteError
      };
    case EDIT_DESCRIPTION:
      return state;
    case EDIT_SUCCESS_DESCRIPTION:
      const dataEditDescription = [...state.data];
      for (let index = 0; index < dataEditDescription.length; ++index) {
        if (dataEditDescription[index]._id === action.id) {
          dataEditDescription[index] = action.result.product;
          break;
        }
      }
      return {
        ...state,
        data: dataEditDescription,
        onDescription: false
      };
    case EDIT_FAIL_DESCRIPTION:
      const descriptionEditError = [...state.error];
      descriptionEditError.push('error deleteProperty: ' + action.error);
      return {
        ...state,
        error: descriptionEditError
      };
    case SHOW_IMAGE:
      return {
        ...state,
        onShowImagePopUp: !action.oldState
      };
    case SHOW_DESCRIPTION:
      const tempS = !action.oldState;
      return {
        ...state,
        // onDescription: !action.oldState
        onDescription: tempS
      };
    case SHOW_PROPERTY:
      return {
        ...state,
        onProperty: !action.oldState
      };
    case DELETE_IMAGE_START:
      return {
        ...state,
        onDeleteImage: {'isActive': true, 'image': action.image}
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
      dataDelImg.map(product => {
        if (product._id === action._id) {
          const imagesS = product.images;
          imagesS.splice(imagesS.indexOf(encodeURIComponent(action.imgDel)), 1);
        }
      });
      // for (let index = 0; index < dataDelImg.length; ++index) {
      //   if (dataDelImg[index]._id === action._id) {
      //     // dataDelImg[index].images = action.result.images;
      //     for (let indexj = 0; indexj < dataDelImg[index].length; ++indexj) {
      //       const imagesM = encodeURIComponent(dataDelImg[index].images[indexj]);
      //       const imageM = encodeURIComponent(action.imgDel);
      //       if (imagesM === imageM) {
      //         dataDelImg[index].images.remove(indexj);
      //         break;
      //       }
      //     }
      //     break;
      //   }
      // }
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
      return {
        ...state,
        onAddImage: true
      };
    case ADD_SUCCESS_IMG:
      const dataAddImg = [...state.data];
      const idProd = action._id;
      const imgProd = action.img;
      dataAddImg.map(product => {
        if (product._id === idProd) {
          const imagesProd = product.images;
          imagesProd.push(imgProd);
        }
      });
      return {
        ...state,
        data: dataAddImg,
        onAddImage: false
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
        onAddProduct: {'isActive': false},
        onDeleteProduct: {'isActive': false},
        onEditProduct: {'isActive': false},
        loading: false,
        loaded: true,
        data: action.result,
        onShowImagePopUp: false,
        onDeleteImage: {'isActive': false},
        onDeleteProperty: {'isActive': false},
        onAddImage: {'isActive': true},
        onAddProductImage: false,
        onDescription: false,
        onProperty: false
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
        if (dataEDIT[index]._id === action._id) {
          dataEDIT[index] = action.result.product;
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
        onAddProduct: {'isActive': false, 'categoryId': action.categoryId}
      };
    case ADD_START_PRODUCT_SUCCESS:
      return {
        ...state,
        onAddProduct: { ...state.onAddProduct, 'isActive': true, 'properties': action.result}
      };
    case ADD_START_PRODUCT_FAIL:
      const addPropertyError = [...state.error];
      addPropertyError.push('error deleteProduct: ' + action.error);
      return {
        ...state,
        error: addPropertyError
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
export function loadProducts(_id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/products/get', {
      data: {_id}
    })
  };
}

export function addStartProduct(categoryId) {
  return {
    types: [ADD_START_PRODUCT, ADD_START_PRODUCT_SUCCESS, ADD_START_PRODUCT_FAIL],
    categoryId: categoryId,
    promise: (client) => client.post('/products/getProperties', {
      data: {categoryId}
    })
  };
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
  return {
    types: [EDIT_PRODUCT, EDIT_SUCCESS_PRODUCT, EDIT_FAIL_PRODUCT],
    _id: _id,
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

export function toggleImg(oldState) {
  return {type: SHOW_IMAGE, oldState};
}
export function toggleProperty(oldState) {
  return {type: SHOW_PROPERTY, oldState};
}
export function toggleDescription(oldState) {
  return {type: SHOW_DESCRIPTION, oldState};
}

export function addStartImg() {
  return {type: ADD_IMAGE_START};
}
export function addStopImg() {
  return {type: ADD_IMAGE_STOP};
}
export function deleteStartImg(image) {
  return {type: DELETE_IMAGE_START, image};
}
export function deleteImgStop() {
  return {type: DELETE_IMAGE_STOP};
}

export function addImg(img, productId) {
  return {
    types: [ADD_IMG, ADD_SUCCESS_IMG, ADD_FAIL_IMG],
    img: img,
    _id: productId,
    promise: (client) => client.post('/products/addImg', {
      data: {img, productId}
    })
  };
}
export function deleteImg(_id, img) {
// console.log('deleteImg modules ' + img);
  return {
    types: [DELETE_IMG, DELETE_SUCCESS_IMG, DELETE_FAIL_IMG],
    imgDel: img,
    _id: _id,
    promise: (client) => client.post('/products/removeImg', {
      data: {'productId': _id, img}
    })
  };
}
export function editProperty(_id, properties) {
  return {
    types: [EDIT_PROPERTY, EDIT_SUCCESS_PROPERTY, EDIT_FAIL_PROPERTY],
    promise: (client) => client.post('/products/editProperty', {
      data: {_id, properties}
    })
  };
}
export function editDescription(_id, description) {
  return {
    types: [EDIT_DESCRIPTION, EDIT_SUCCESS_DESCRIPTION, EDIT_FAIL_DESCRIPTION],
    id: _id,
    promise: (client) => client.post('/products/editDescription', {
      data: {_id, description}
    })
  };
}
