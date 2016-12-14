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
          'admin': users[i].isAdmin
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
    let fName = req.body.user.firstName;
    let lName = req.body.user.lastName;
    let passwd = req.body.user.password;
    let isAdmin = req.body.isAdmin;
    UsersDb.addUser(fName, lName, passwd, isAdmin).then(user => {
      resolve({'id': user._id});
    }).catch(error => {
      reject('error in add: ' + error);
    });
  });
}

export function deleteUser(req) {
  return new Promise((resolve, reject) => {
    UsersDb.deleteUser(req.body.id).then(() => {
      resolve({'id': req.body.id});
    }).catch(error => {
      reject('error in deleteUser: ' + error);
    });
  });
}

export function edit(req) {
  return new Promise((resolve, reject) => {
    const user = {
      'id': req.body.user.id,
      'firstName': req.body.user.firstName,
      'lastName': req.body.user.lastName,
      'email': req.body.user.email,
      'password': req.body.user.password,
      'phone': req.body.user.phone,
      'address': req.body.user.address,
      'admin': req.body.admin
    };
    UsersDb.editUser(user).then(user => {
      resolve({'id': user._id});
    }).catch(error => {
      reject('error in edit: ' + error);
    });
  });
}
