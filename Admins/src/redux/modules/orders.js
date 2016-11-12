const LOAD = 'redux/modules/orders/LOAD';
const LOAD_SUCCESS = 'redux/modules/orders/LOAD_SUCCESS';
const LOAD_FAIL = 'redux/modules/orders/LOAD_FAIL';
const SAVE = 'redux/modules/orders/SAVE';
const SAVE_SUCCESS = 'redux/modules/orders/SAVE_SUCCESS';
const SAVE_FAIL = 'redux/modules/orders/SAVE_FAIL';

const DELIVERY_SEND = 'redux/modules/orders/DELIVERY_SEND';
const DELIVERY_SEND_OK = 'redux/modules/orders/DELIVERY_SEND_OK';
const DELIVERY_SEND_FAIL = 'redux/modules/orders/DELIVERY_SEND_FAIL';
const DELETE_ORDER = 'redux/modules/orders/DELETE_ORDER';
const DELETE_ORDER_OK = 'redux/modules/orders/DELETE_ORDER_OK';
const DELETE_ORDER_FAIL = 'redux/modules/orders/DELETE_ORDER_FAIL';

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


    case DELIVERY_SEND:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };

    case DELETE_ORDER:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.getOrder && globalState.orders.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/orders/sefhif')
  };
}

export function cancelOrders(id) {
  return {
    types: [DELETE_ORDER, DELETE_ORDER_FAIL, DELETE_ORDER_OK],
    deleteOrder: true,
    promise: (client) => client.post('/orders/cancelOrder', {
      data: id
    })
  };
}

export function toDelivery(id) {
  return { type: [DELIVERY_SEND, DELIVERY_SEND_OK, DELIVERY_SEND_FAIL],
    sendToDeliveryOrder: true,
    promise: (client) => client.post('/orders/applyOrder', {
      data: id
    })
  };
}
