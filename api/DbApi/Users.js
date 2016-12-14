import {db} from "./index";

function connectToDbUsersModel() {
  let Users = new db.Schema({
    // _id: { type: db.Schema.Types.ObjectId, required: true },
    email: { type: db.Schema.Types.String, required: true },
    // password: { type: db.Schema.Types.String, required: true },
    phoneNumber: { type: db.Schema.Types.String, required: true },
    address: { type: db.Schema.Types.String, required: true },
    firstName: { type: db.Schema.Types.String, required: true },
    lastName: { type: db.Schema.Types.String, required: true },
    // cards: { type: Array, required: true },
    isAdmin: { type: db.Schema.Types.Bool, required: true }
  });

  return db.mongoose.model('Users', Users);
}

const UsersModel = connectToDbUsersModel();

export function getUsers() {
  return UsersModel.find({}, function (err, users) {
    if(!err) {
      return users;
    }
    console.error('getUsers error: ' + err);
    return 'error in getUsers: ' + err;
  });
}

export function getUserById(id) {
  return UsersModel.findById(id, function (err, user) {
    if(!err) {
      return user;
    }
    console.error('getUserById error: ' + err);
    return 'error in getUserById: ' + err;
  });
}

export function deleteUser(id) {
  return UsersModel.remove({ _id: id }, function(err) {
    if (!err) {
      return 0;
    }
    else {
      console.error('deleteUser: ' + err);
      return 'error in deleteUser: ' + err;
    }
  });
}

export function addUser(firstName, lastName, passwd, isAdmin) {
  const user = { email: " ", phoneNumber: " ", address: " ",
    firstName: firstName, lastName: lastName, password: passwd, isAdmin: isAdmin };
  return UsersModel.create(user, function(err) {
    if (!err) {
      return UsersModel.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, user) {
        if(!err) {
          return user;
        }
        else {
          console.error('addUser error1: ' + err);
          return 'error1 in addUser: ' + err;
        }
      });
    }
    else {
      console.error('addUser error2: ' + err);
      return 'error2 in addUser: ' + err;
    }
  });
}

export function editUser(userNew) {
  return UsersModel.findById(userNew.id, function (err, user) {
    if (err) {
      console.error('editUser error1: ' + err);
      return 'error1 in editUser: ' + err;
    }
    user.firstName = userNew.firstName;
    user.lastName = userNew.lastName;
    user.admin = userNew.admin;
    user.address = userNew.address;
    user.email = userNew.email;
    user.phoneNumber = userNew.phone;
    user.password = (typeof userNew.password === 'undefined') ? userNew.password : user.password;
    user.save(function (err, updatedUser) {
      if (err) {
        console.error('editUser error2: ' + err);
        return 'error2 in editUser: ' + err;
      }
      return updatedUser;
    });
  });
}


