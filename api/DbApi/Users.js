import {db} from "./index";
import bcrypt from 'bcrypt-as-promised';
function connectToDbUsersModel() {
  let Users = new db.Schema({
    email: { type: db.Schema.Types.String, required: true },
    firstName: { type: db.Schema.Types.String, required: true },
    lastName: { type: db.Schema.Types.String, required: true },
    isAdmin: { type: db.Schema.Types.Bool, required: true },
    password: { type: db.Schema.Types.String },
    phoneNumber: { type: db.Schema.Types.String, default: '' },
    address: { type: db.Schema.Types.String, default: '' },
    isEmailVerified: { type: Boolean, default: false },
    bankId: { type: String, default: '' },
    createdDate: { type: Date, default: Date.now() }
  });

  Users.pre('save', async function (next) {
    if(!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  });
  return db.mongoose.model('Users', Users);
}

export const UsersModel = connectToDbUsersModel();

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

export function addUser(user) {
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
    let passwd = (typeof userNew.password !== 'undefined') ? userNew.password : user.password;
    Object.assign(user, userNew);
    user.password = passwd;
    user.save(function (err, updatedUser) {
      if (err) {
        console.error('editUser error2: ' + err);
        return 'error2 in editUser: ' + err;
      }
      return updatedUser;
    });
  });
}


