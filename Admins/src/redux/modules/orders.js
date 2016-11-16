const LOAD = 'redux/modules/orders/LOAD';
const LOAD_OK = 'redux/modules/orders/LOAD_SUCCESS';
const LOAD_FAIL = 'redux/modules/orders/LOAD_FAIL';

const DELIVERY_SEND = 'redux/modules/orders/DELIVERY_SEND';
const DELIVERY_SEND_OK = 'redux/modules/orders/DELIVERY_SEND_OK';
const DELIVERY_SEND_FAIL = 'redux/modules/orders/DELIVERY_SEND_FAIL';

const DELETE_ORDER = 'redux/modules/orders/DELETE_ORDER';
const DELETE_ORDER_OK = 'redux/modules/orders/DELETE_ORDER_OK';
const DELETE_ORDER_FAIL = 'redux/modules/orders/DELETE_ORDER_FAIL';

const APPLY_START = 'redux/modules/orders/APPLY_START';
const APPLY_STOP = 'redux/modules/orders/APPLY_STOP';

const initialState = {
  loaded: false,
  sendError: {},
  apply: {}
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
    case DELIVERY_SEND: // 'saving' flag handled by redux-form
      return state;
    case DELIVERY_SEND_OK:
      return {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case DELIVERY_SEND_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    case DELETE_ORDER: // 'saving' flag handled by redux-form
      return state;
    case DELETE_ORDER_OK:
      return {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case DELETE_ORDER_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    case APPLY_START:
      return {
        ...state,
        apply: {
          ...state.apply,
          [action.id]: true
        }
      };
    case APPLY_STOP:
      return {
        ...state,
        apply: {
          ...state.apply,
          [action.id]: false
        }
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.orders && globalState.orders.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_OK, LOAD_FAIL],
    promise: (client) => client.get('/orders/get')
  };
}

export function rejectOrder(order) {
  return {
    types: [DELETE_ORDER, DELETE_ORDER_FAIL, DELETE_ORDER_OK],
    id: order.id,
    promise: (client) => client.post('/orders/cancel', {
      data: order
    })
  };
}

export function sendToDeliveryOrder(order) {
  return { type: [DELIVERY_SEND, DELIVERY_SEND_OK, DELIVERY_SEND_FAIL],
    id: order.id,
    promise: (client) => client.post('/orders/apply', {
      data: order
    })
  };
}

export function applyStart(id) {
  return { type: APPLY_START, id };
}

export function applyStop(id) {
  return { type: APPLY_STOP, id };
}
