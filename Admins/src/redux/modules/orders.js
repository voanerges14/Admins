const LOAD = 'redux/modules/orders/LOAD';
const LOAD_OK = 'redux/modules/orders/LOAD_SUCCESS';
const LOAD_FAIL = 'redux/modules/orders/LOAD_FAIL';

const DELIVERY_SEND = 'redux/modules/orders/DELIVERY_SEND';
const DELIVERY_SEND_OK = 'redux/modules/orders/DELIVERY_SEND_OK';
const DELIVERY_SEND_FAIL = 'redux/modules/orders/DELIVERY_SEND_FAIL';

const DELETE_ORDER = 'redux/modules/orders/DELETE_ORDER';
const DELETE_ORDER_OK = 'redux/modules/orders/DELETE_ORDER_OK';
const DELETE_ORDER_FAIL = 'redux/modules/orders/DELETE_ORDER_FAIL';

const START_SEND = 'redux/modules/orders/APPLY_START_SEND';
const STOP_SEND = 'redux/modules/orders/APPLY_STOP_SEND';

const START_REJECT = 'redux/modules/orders/APPLY_START_REJECT';
const STOP_REJECT = 'redux/modules/orders/APPLY_STOP_REJECT';

const initialState = {
  loaded: false,
  toDeliveryBtn: {},
  rejectOrderBtn: {}
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
    case DELIVERY_SEND: // 'saving' flag handled by redux-form
      return state;
    case DELIVERY_SEND_OK:
      const data = [...state.data];
      for (let index = 0; index < data.length; ++index) {
        if (data[index].id === action.result) {
          data.splice(index, 1);
          break;
        }
      }
      return {
        ...state,
        sendError: {
          ...state.sendError,
          [action.id]: null
        },
        data: data
      };
    case DELIVERY_SEND_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        sendError: {
          ...state.sendError,
          [action.id]: action.error
        }
      } : state;
    case DELETE_ORDER: // 'saving' flag handled by redux-form
      return state;
    case DELETE_ORDER_OK:
      return {
        ...state,
        deleteError: {
          ...state.deleteError,
          [action.id]: null
        }
      };
    case DELETE_ORDER_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        deleteError: {
          ...state.deleteError,
          [action.id]: action.error
        }
      } : state;
    case START_SEND:
      return {
        ...state,
        toDeliveryBtn: {
          ...state.toDeliveryBtn,
          [action.id]: true
        }
      };
    case STOP_SEND:
      return {
        ...state,
        toDeliveryBtn: {
          ...state.toDeliveryBtn,
          [action.id]: false
        }
      };
    case START_REJECT:
      return {
        ...state,
        rejectOrderBtn: {
          ...state.rejectOrderBtn,
          [action.id]: true
        }
      };
    case STOP_REJECT:
      return {
        ...state,
        rejectOrderBtn: {
          ...state.rejectOrderBtn,
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

export function rejectOrder(id) {
  return {
    types: [DELETE_ORDER, DELETE_ORDER_OK, DELETE_ORDER_FAIL],
    id: id,
    promise: (client) => client.post('/orders/cancel', {
      data: {'id': id}
    })
  };
}

export function toDeliveryOrder(id) {
  return { types: [DELIVERY_SEND, DELIVERY_SEND_OK, DELIVERY_SEND_FAIL],
    id: id,
    promise: (client) => client.post('/orders/apply', {
      data: {'id': id}
    })
  };
}

export function startSend(id) {
  return { type: START_SEND, id };
}

export function startReject(id) {
  return { type: START_REJECT, id };
}

export function stopSend(id) {
  return { type: STOP_SEND, id };
}

export function stopReject(id) {
  return { type: STOP_REJECT, id };
}
