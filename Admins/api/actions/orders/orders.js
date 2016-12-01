import * as OrdersDb from './../../DbApi/Orders';
import * as UsersDb from './../../DbApi/Users';
import * as ProductsDb from './../../DbApi/Products';

export function get() {
  return new Promise((resolve, reject) => {
    OrdersDb.getOrdersWithStatusPAID().then(orders => {
      let usersIds = [];
      for(let i = 0; i < orders.length; ++i) {
        usersIds.push(orders[i].userId);
      }
      UsersDb.getUserByIds(usersIds).then(users => {
        let returnOrders = [];
        for(let i = 0; i < orders.length; ++i) {
          // little bug --> products: [ [{}], [{}], ...   ]
          let product = [];
          for(let b = 0; b < orders[i].products.length; ++b) {
            product.push(orders[i].products[b][0]);
          }
          // end little bug
          returnOrders.push({id: orders[i]._id, user: users[i], products: product});
        }
        resolve(returnOrders);
      }).catch(err => {
        reject('error in get: ' + err);
      });
    }).catch(err => {
      reject('error in get: ' + err);
    });
  });
}

export function apply(req) {
  return new Promise((resolve, reject) => {
    // send to delivery query
    ////
    OrdersDb.sendToDeliveryOrder(req.body.id).then(order => {
      console.log('orderId: ' + order._id);
        resolve(order._id);
    }).catch(err => {
      console.log('err: ' + err);
      reject('error in apply:' + err);
    });
  });
}
