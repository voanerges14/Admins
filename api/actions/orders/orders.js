import * as OrdersDb from './../../DbApi/Orders';
import * as UsersDb from './../../DbApi/Users';
import request from 'request';

function findById(arr, id) {
  for (let index = 0; index < arr.length; ++index) {
    if (arr[index]._id.toString() === id.toString()) {
      return {'firstName': arr[index].firstName, 'lastName': arr[index].lastName, 'email': arr[index].email};
    }
  }
  return {'firstName': 'user', 'lastName': 'not found', 'email': ' '};
}
function replaceUserIdByUser(array, users) {
  return array.map(function(elem) {
    return {
      'id': elem._id,
      'user': findById(users, elem.userId),
      'total': elem.total,
      'products': elem.products,
      'status': elem.status,
      'phoneNumber': elem.phoneNumber,
    };
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
      if (response.statusCode === 200) {
        resolve();
      } else {
        reject(JSON.stringify(body));
      }
    });
  });
}

export function getPaid() {
  return new Promise((resolve, reject) => {
    OrdersDb.getOrdersWithStatusPAID().then(orders => {
      const usersIds = orders.map(function(order) {return order.userId;});

      UsersDb.getUsersByIds(usersIds).then(users => {
        resolve(replaceUserIdByUser(orders, users));
      });
    }).catch(err => {
      reject('error in get: ' + err);
    });
  });
}

export function getAll() {
  return new Promise((resolve, reject) => {
    OrdersDb.getOrders().then(orders => {
      const usersIds = orders.map(function(order) {return order.userId;});

      UsersDb.getUsersByIds(usersIds).then(users => {
        resolve(replaceUserIdByUser(orders, users));
      });
    }).catch(err => {
      reject('error in get: ' + err);
    });
  });
}

export function apply(req) {
  return new Promise((resolve, reject) => {
    // send to delivery query
    OrdersDb.sendToDeliveryOrder(req.body.id).then(() => {
      getAll().then(res => {
        resolve(res);
      });
    }).catch(err => {
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
        });
      });
    }).catch(error => {
      reject('error in cancel: ' + error);
    });
  });
}


