import * as OrdersDb from './../../DbApi/Orders';
import * as UsersDb from './../../DbApi/Users';

export function get() {
  return new Promise((resolve, reject) => {
    OrdersDb.getOrdersWithStatusPAID().then(orders => {
      let actions = [];
      for(let i = 0; i < orders.length; ++i) {
        actions.push(UsersDb.getUserById(orders[i].userId));
      }
      Promise.all(actions).then(users => {
        let returnOrders = [];
        for(let i = 0; i < orders.length; ++i) {
          returnOrders.push({id: orders[i]._id, user: users[i], products: orders[i].products});
        }
        resolve(returnOrders);
      }).catch(err => {
        reject('error in get: ' + err);
      });
    })
  });
}

export function apply(req) {
  return new Promise((resolve, reject) => {
    // send to delivery query
    ////
    OrdersDb.sendToDeliveryOrder(req.body.id).then(order => {
        resolve({'id': order._id});
    }).catch(err => {
      console.log('err: ' + err);
      reject('error in apply:' + err);
    });
  });
}

export function cancel(req) {
  return new Promise((resolve, reject) => {
    OrdersDb.deleteOrder(req.body.id).then(() => {
      resolve({'id': req.body.id});
    }).catch(err => {
      console.log('err: ' + err);
      reject('error in apply:' + err);
    });
  });
}
