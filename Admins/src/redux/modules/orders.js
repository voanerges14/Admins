const LOAD = 'redux/modules/orders/LOAD';
const LOAD_OK = 'redux/modules/orders/LOAD_SUCCESS';
const LOAD_FAIL = 'redux/modules/orders/LOAD_FAIL';

const DELIVERY_SEND = 'redux/modules/orders/DELIVERY_SEND';
const DELIVERY_SEND_OK = 'redux/modules/orders/DELIVERY_SEND_OK';
const DELIVERY_SEND_FAIL = 'redux/modules/orders/DELIVERY_SEND_FAIL';

const DELETE_ORDER = 'redux/modules/orders/DELETE_ORDER';
const DELETE_ORDER_OK = 'redux/modules/orders/DELETE_ORDER_OK';
const DELETE_ORDER_FAIL = 'redux/modules/orders/DELETE_ORDER_FAIL';

const APPLY_START_SEND = 'redux/modules/orders/APPLY_START_SEND';
const APPLY_STOP_SEND = 'redux/modules/orders/APPLY_STOP_SEND';

const APPLY_START_REJECT = 'redux/modules/orders/APPLY_START_REJECT';
const APPLY_STOP_REJECT = 'redux/modules/orders/APPLY_STOP_REJECT';

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
      let index = -1;
      const data = [...state.data];
      for (let ind = 0; ind < data.length; ++ind) {
        if (data[ind].id === action.result) {
          index = ind;
          break;
        }
      }
      data.splice(index, 1);
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
    case APPLY_START_SEND:
      return {
        ...state,
        toDeliveryBtn: {
          ...state.toDeliveryBtn,
          [action.id]: true
        }
      };
    case APPLY_STOP_SEND:
      return {
        ...state,
        toDeliveryBtn: {
          ...state.toDeliveryBtn,
          [action.id]: false
        }
      };
    case APPLY_START_REJECT:
      return {
        ...state,
        rejectOrderBtn: {
          ...state.rejectOrderBtn,
          [action.id]: true
        }
      };
    case APPLY_STOP_REJECT:
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
    types: [DELETE_ORDER, DELETE_ORDER_FAIL, DELETE_ORDER_OK],
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

export function applyStartSend(id) {
  return { type: APPLY_START_SEND, id };
}

export function applyStartReject(id) {
  return { type: APPLY_START_REJECT, id };
}

export function applyStopSend(id) {
  return { type: APPLY_STOP_SEND, id };
}

export function applyStopReject(id) {
  return { type: APPLY_STOP_REJECT, id };
}
