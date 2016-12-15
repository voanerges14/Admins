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

const CHANGE_SHOW_ORDERS = 'redux/modules/orders/CHANGE_SHOW_ORDERS';

const initialState = {
  loadedInitial: false,
  loadedAll: false,
  loadedPaid: false,
  toDeliveryBtn: {},
  rejectOrderBtn: {},
  error: [],
  showOrders: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case CHANGE_SHOW_ORDERS:
      const oldState = action.showOrders;
      return {
        ... state,
        showOrders: !oldState
      };

    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_OK:
      const dataAll = action.result;
      const dataPaid = [];
      for (let index = 0; index < dataAll.length; ++index) {
        if (dataAll[index].status === 'PAID') {
          dataPaid.push(dataAll[index]);
        }
      }
      return {
        ...state,
        loading: false,
        loadedInitial: true,
        dataAll: dataAll,
        dataPaid: dataPaid
      };
    case LOAD_FAIL:
      const loadError = [...state.error];
      loadError.push('Error LoadAll: ' + action.error);
      return {
        ...state,
        loading: false,
        loadedInitial: false,
        dataAll: null,
        dataPaid: null,
        error: loadError
      };
    case DELIVERY_SEND:
      return {
        ...state,
        showOrders: true
      };
    case DELIVERY_SEND_OK:
      const dataAllDelivery = action.result;
      const dataPaidDelivery = [];
      for (let index = 0; index < dataAllDelivery.length; ++index) {
        if (dataAllDelivery[index].status === 'PAID') {
          dataPaidDelivery.push(dataAllDelivery[index]);
        }
      }
      return {
        ...state,
        toDeliveryBtn: {
          ...state.toDeliveryBtn,
          [action.id]: false
        },
        dataPaid: dataPaidDelivery,
        dataAll: dataAllDelivery,
        showOrders: false
      };
    case DELIVERY_SEND_FAIL:
      const deliveryError = [...state.error];
      deliveryError.push('Error Delivery: ' + action.error);
      return {
        ...state,
        error: deliveryError
      };
    case DELETE_ORDER:
      return state;
    case DELETE_ORDER_OK:
      const dataAllDelete = action.result;
      const dataPaidDelete = [];
      for (let index = 0; index < dataAllDelete.length; ++index) {
        if (dataAllDelete [index].status === 'PAID') {
          dataPaidDelete.push(dataAllDelete [index]);
        }
      }
      return {
        ...state,
        rejectOrderBtn: {
          ...state.rejectOrderBtn,
          [action.id]: false
        },
        dataPaid: dataPaidDelete,
        dataAll: dataAllDelete
      };
    case DELETE_ORDER_FAIL:
      const deleteError = [...state.error];
      deleteError.push('Error Delete: ' + action.error);
      return {
        ...state,
        error: deleteError
      };
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

export function changeOrders(showOrders) {
  return {type: CHANGE_SHOW_ORDERS, showOrders};
}

export function isLoaded(globalState) {
  return globalState.orders && globalState.orders.loaded;
}
export function load() {
  return {
    types: [LOAD, LOAD_OK, LOAD_FAIL],
    promise: (client) => client.get('/orders/getAll')
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
