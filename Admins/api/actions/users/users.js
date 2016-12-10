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

export function add(req) {
  return new Promise((resolve, reject) => {
    // console.log('1) ' + JSON.stringify(req.body));
    let fName = req.body.user.firstName;
    let lName = req.body.user.lastName;
    let passwd = req.body.user.password;
    let isAdmin = req.body.isAdmin;
    UsersDb.addUser(fName, lName, passwd, isAdmin).then(user => {
      resolve(user._id);
    }).catch(error => {
      reject('error in add: ' + error);
    });
  });
}

export function deleteUser(req) {
  return new Promise((resolve, reject) => {
    UsersDb.deleteUser(req.body.id).then(() => {
      // console.log('res: ' + res);
      resolve(req.body.id);
    }).catch(error => {
      reject('error in deleteUser: ' + error);
    });
  });
}
