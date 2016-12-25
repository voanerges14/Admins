import * as UsersDb from './../../DbApi/Users';

export function get() {
  return new Promise((resolve, reject) => {
    UsersDb.getUsers().then(users => {
      const modifyUsers = users.map(function(user) {
        return {
          'id': user._id,
          'firstName': user.firstName,
          'lastName': user.lastName,
          'email': user.email,
          'phone': user.phoneNumber,
          'address': user.address,
          'admin': user.isAdmin
        };
      });
      resolve(modifyUsers);
    }).catch(err => {
      reject('error in get: ' + err);
    });
  });
}

export function add(req) {
  return new Promise((resolve, reject) => {
    const user = {
      email: req.body.user.email,
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      password: req.body.user.password,
      isAdmin: req.body.isAdmin
    };
    UsersDb.addUser(user).then(id => {
      resolve({id});
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
      'firstName': req.body.user.firstName,
      'lastName': req.body.user.lastName,
      'email': req.body.user.email,
      'phoneNumber': req.body.user.phone,
      'address': req.body.user.address,
      'isAdmin': req.body.admin
    };
    if (typeof req.body.user.password !== 'undefined') {
      user.password = req.body.user.password;
    }
    UsersDb.editUser(req.body.user.id, user).then(newUser => {
      resolve({'id': newUser._id});
    }).catch(error => {
      reject('error in edit: ' + error);
    });
  });
}
