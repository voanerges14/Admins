import {db} from './index';

function connectToDbOrdersModel() {
  const Orders = new db.Schema({
    _id: { type: db.Schema.Types.ObjectId, required: true },
    userId: { type: db.Schema.Types.ObjectId, required: true },
    products: { type: Array, required: true },
    status: {type: db.Schema.Types.String, required: true},
    date: {
      paid: Date,
      delivering: Date
    },
    total: { type: Number },
    cardId: { type: db.Schema.Types.String }
  });

  return db.mongoose.model('Orders', Orders);
}

const OrdersModel = connectToDbOrdersModel();

export function getOrderById(id) {
  return new Promise((resolve, reject) => {
    OrdersModel.findById(id).then(order => {
      resolve(order);
    }).catch(err => {
      console.error('getOrderById error: ' + err);
      reject('error in getOrderById: ' + err);
    });
  });
}

export function getOrdersByIds(ids) {
  return new Promise((resolve, reject) => {
    OrdersModel.find({'_id': {$in: ids}}).then(order => {
      resolve(order);
    }).catch(err => {
      console.error('getOrderById error: ' + err);
      reject('error in getOrderById: ' + err);
    });
  });
}

export function getOrders() {
  return new Promise((resolve, reject) => {
    OrdersModel.find({}).then(orders => {
      resolve(orders);
    }).catch(err => {
      console.error('getOrders error: ' + err);
      reject('error in getOrders: ' + err);
    });
  });
}

export function getOrdersWithStatusPAID() {
  return new Promise((resolve, reject) => {
    OrdersModel.find({'status': 'PAID'}).then(orders => {
      resolve(orders);
    }).catch(err => {
      console.error('getOrdersWithStatusPAID error: ' + err);
      reject('error in getOrdersWithStatusPAID: ' + err);
    });
  });
}

export function sendToDeliveryOrder(id) {
  return new Promise((resolve, reject) => {
    OrdersModel.findOneAndUpdate({'_id': id},
      {$set: {'status': 'DELIVERING', 'date': {delivering: Date.now()}}}, {new: true}).then(order => {
        resolve(order);
      }).catch(err => {
        console.error('sendToDeliveryOrder error: ' + err);
        reject('error in sendToDeliveryOrder: ' + err);
      });
  });
}

export function deleteOrder(id) {
  return new Promise((resolve, reject) => {
    OrdersModel.remove({ _id: id }).then(order => {
      resolve(order);
    }).catch(err => {
      console.error('deleteOrder error: ' + err);
      reject('error in deleteOrder: ' + err);
    });
  });
}


