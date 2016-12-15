const LOAD = 'redux/modules/orders/LOAD';
const LOAD_OK = 'redux/modules/orders/LOAD_SUCCESS';
const LOAD_FAIL = 'redux/modules/orders/LOAD_FAIL';
const LOAD_ALL = 'redux/modules/orders/LOAD_ALL';
const LOAD_ALL_OK = 'redux/modules/orders/LOAD_ALL_SUCCESS';
const LOAD_ALL_FAIL = 'redux/modules/orders/LOAD_ALL_FAIL';
const LOAD_PAID = 'redux/modules/orders/LOAD_PAID';
const LOAD_PAID_OK = 'redux/modules/orders/LOAD_PAID_SUCCESS';
const LOAD_PAID_FAIL = 'redux/modules/orders/LOAD_PAID_FAIL';
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
    case LOAD_ALL:
      return {
        ...state,
        loadingAll: true
      };
    case LOAD_ALL_OK:
      return {
        ...state,
        loadingAll: false,
        loadedAll: true,
        dataAll: action.result
      };
    case LOAD_ALL_FAIL:
      const loadErrorAll = [...state.error];
      loadErrorAll.push('Error LoadAll: ' + action.error);
      return {
        ...state,
        loadingAll: false,
        loadedAll: false,
        dataAll: null,
        error: loadErrorAll
      };
    case LOAD_PAID:
      return {
        ...state,
        loadingPaid: true
      };
    case LOAD_PAID_OK:
      return {
        ...state,
        loadingPaid: false,
        loadedPaid: true,
        dataPaid: action.result
      };
    case LOAD_PAID_FAIL:
      const loadErrorPaid = [...state.error];
      loadErrorPaid.push('Error LoadPaid: ' + action.error);
      return {
        ...state,
        loadingPaid: false,
        loadedPaid: false,
        dataPaid: null,
        error: loadErrorPaid
      };
    case DELIVERY_SEND:
      return state;
    case DELIVERY_SEND_OK:
      const deliveryData = [...state.dataPaid];
      for (let indx = 0; indx < deliveryData.length; ++indx) {
        if (deliveryData[indx].id === action.result.id) {
          deliveryData.splice(indx, 1);
          break;
        }
      }

      const dataAllDelivery = [...state.dataAll];
      for (let index = 0; index < dataAllDelivery.length; ++index) {
        if (dataAllDelivery[index].id === action.result.id) {
          dataAllDelivery[index].status = 'DELIVERING';
          break;
        }
      }
      return {
        ...state,
        toDeliveryBtn: {
          ...state.toDeliveryBtn,
          [action.result.id]: false
        },
        dataPaid: deliveryData,
        dataAll: dataAllDelivery
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
      const deleteData = [...state.dataPaid];
      for (let indx = 0; indx < deleteData.length; ++indx) {
        if (deleteData[indx].id === action.result.id) {
          deleteData.splice(indx, 1);
          break;
        }
      }

      const deleteDataAll = [...state.dataAll];
      for (let index = 0; index < deleteDataAll.length; ++index) {
        if (deleteDataAll[index].id === action.result.id) {
          deleteDataAll.splice(index, 1);
          break;
        }
      }
      return {
        ...state,
        rejectOrderBtn: {
          ...state.rejectOrderBtn,
          [action.result.id]: false
        },
        dataPaid: deleteData,
        dataAll: deleteDataAll
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
export function loadAll() {
  return {
    types: [LOAD_ALL, LOAD_ALL_OK, LOAD_ALL_FAIL],
    promise: (client) => client.get('/orders/getAll')
  };
}
export function loadPaid() {
  return {
    types: [LOAD_PAID, LOAD_PAID_OK, LOAD_PAID_FAIL],
    promise: (client) => client.get('/orders/getPaid')
  };
}

export function rejectOrder(id) {
  return {
    types: [DELETE_ORDER, DELETE_ORDER_OK, DELETE_ORDER_FAIL],
    promise: (client) => client.post('/orders/cancel', {
      data: {'id': id}
    })
  };
}
export function toDeliveryOrder(id) {
  return { types: [DELIVERY_SEND, DELIVERY_SEND_OK, DELIVERY_SEND_FAIL],
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
