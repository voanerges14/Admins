import {db} from './index';
import bcrypt from 'bcrypt-as-promised';

function connectToDbUsersModel() {
  const Users = new db.Schema({
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
    if (!this.isModified('password')) {
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
  return new Promise((resolve, reject) => {
    UsersModel.find({}).then(users => {
      resolve(users);
    }).catch(err => {
      console.error('getUsers error: ' + err);
      reject('error in getUsers: ' + err);
    });
  });
}

export function getUserById(id) {
  return new Promise((resolve, reject) => {
    UsersModel.findById(id).then(user => {
      resolve(user);
    }).catch(err => {
      console.error('getUserById error: ' + err);
      reject('error in getUserById: ' + err);
    });
  });
}

export function getUsersByIds(ids) {
  return new Promise((resolve, reject) => {
    UsersModel.find({'_id': {$in: ids}}).then(user => {
      resolve(user);
    }).catch(err => {
      console.error('getUserById error: ' + err);
      reject('error in getUserById: ' + err);
    });
  });
}

export function deleteUser(id) {
  return new Promise((resolve, reject) => {
    UsersModel.remove({ _id: id }).then(() => {
      resolve();
    }).catch(err => {
      console.error('deleteUser: ' + err);
      reject('error in deleteUser: ' + err);
    });
  });
}

export function addUser(user) {
  return new Promise((resolve, reject) => {
    const newUser = new UsersModel(user);
    newUser.save().then(addedUser => {
      resolve(addedUser._id);
    }).catch(err => {
      console.error('addUser error: ' + err);
      reject('error in addUser: ' + err);
    });
  });
}

export function editUser(id, userNew) {
  return new Promise((resolve, reject) => {
    UsersModel.findById(id).then(user => {
      Object.assign(user, userNew);
      user.save().then(updatedUser => {
        resolve(updatedUser);
      });
    }).catch(err => {
      console.error('editUser error: ' + err);
      reject('error in editUser: ' + err);
    });
  });
}


