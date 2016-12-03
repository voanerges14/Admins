import * as OrdersDb from './../../DbApi/Orders';
import * as UsersDb from './../../DbApi/Users';

export function get() {
  return new Promise((resolve, reject) => {
    UsersDb.getUsers().then(users => {
      let newUsers = [];
      for(let i = 0; i < users.length; ++i) {
        newUsers.push({
          'id': users[i]._id,
          'firstName': users[i].firstName,
          'lastName': users[i].lastName,
          'email': users[i].email,
          'phone': users[i].phoneNumber,
          'address': users[i].address,
          // 'cards': users[i].cards,
          "admin": users[i].isAdmin
        });
      }
      resolve(newUsers);
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
