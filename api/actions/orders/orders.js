import * as OrdersDb from './../../DbApi/Orders';
import * as UsersDb from './../../DbApi/Users';
import request from 'request';

export function getPaid() {
  return new Promise((resolve, reject) => {
    OrdersDb.getOrdersWithStatusPAID().then(orders => {
      let actions = [];
      for(let i = 0; i < orders.length; ++i) {
        actions.push(UsersDb.getUserById(orders[i].userId));
      }
      Promise.all(actions).then(users => {
        let returnOrders = [];
        for(let i = 0; i < orders.length; ++i) {
          if(users[i] == null) {
            users[i] = {
              firstName: 'User',
              lastName: 'not found',
              email: ' ',
              phoneNumber: ' '
            };
          }
          returnOrders.push({
            'id': orders[i]._id,
            'user': users[i],
            'total': orders[i].total,
            'products': orders[i].products
          });
        }
        resolve(returnOrders);
      }).catch(err => {
        reject('error in get: ' + err);
      });
    })
  });
}

export function getAll() {
  return new Promise((resolve, reject) => {
    OrdersDb.getOrders().then(orders => {
      let actions = [];
      for(let i = 0; i < orders.length; ++i) {
        actions.push(UsersDb.getUserById(orders[i].userId));
      }
      Promise.all(actions).then(users => {
        let returnOrders = [];
        for(let i = 0; i < orders.length; ++i) {
          if(users[i] == null) {
            users[i] = {
              firstName: 'User',
              lastName: 'not found',
              email: ' ',
              phoneNumber: ' '
            };
          }
          returnOrders.push(
              {
                'id': orders[i]._id,
                'user': users[i],
                'products': orders[i].products,
                'total': orders[i].total,
                'status': orders[i].status
              });
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
    OrdersDb.sendToDeliveryOrder(req.body.id).then(() => {
      getAll().then(res => {
        resolve(res);
      });
    }).catch(err => {
      console.log('err: ' + err);
      reject('error in apply:' + err);
    });
  });
}

export function cancel(req) {
  return new Promise((resolve, reject) => {
    OrdersDb.getOrderById(req.body.id).then(order => {
      cashBack(order.cardId, order.total).then(() => {
        OrdersDb.deleteOrder(req.body.id).then(() => {
          getAll().then(res => {
            resolve(res);
          });
        }).catch(err => {
          console.log('err: ' + err);
          reject('error in cancel:' + err);
        });
      }).catch(error => {
        reject('error in cancel: bank denied: ' + error);
      });
    });
  });
}

function cashBack(cardId, amount) {
  return new Promise((resolve, reject) => {
    request({
      url: 'https://bankapi1997.herokuapp.com/returnPayment',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 374d4b32-7d0a-42af-88cb-046368e1b6df'
      }, json: {cardId, amount}
    }, (err, response, body) => {
      if(response.statusCode == 200) {
        resolve();
      } else {
        reject(JSON.stringify(body));
      }
    });
  });
}
