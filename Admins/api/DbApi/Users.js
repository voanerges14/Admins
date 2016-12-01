// collection Users:
// {
//   "_id",
//   "email": String,
//   "password": String,
//   "phoneNumber": Number,
//   "address": String,
//   "firstName": String,
//   "lastName": String,
//   "cards": Array of objects,
//   "isAdmin": Boolean
// }
// when close connections?
import {db} from "./index";

function connectToDbUsersModel() {
  let Users = new db.Schema({
    _id: { type: db.Schema.Types.ObjectId, required: true },
    email: { type: db.Schema.Types.String, required: true },
    // password: { type: db.Schema.Types.String, required: true },
    phoneNumber: { type: db.Schema.Types.String, required: true },
    address: { type: db.Schema.Types.String, required: true },
    firstName: { type: db.Schema.Types.String, required: true },
    lastName: { type: db.Schema.Types.String, required: true },
    // cards: { type: db.Schema.Types.Array, required: true },
    isAdmin: { type: db.Schema.Types.Bool, required: true }
  });

  let UsersModel = db.mongoose.model('Users', Users);
  return UsersModel;
}

var UsersModel = connectToDbUsersModel();

export function getUsers() {
  return UsersModel.find({}, function (err, users) {
    if(!err) {
      return users;
    }
    console.error('getOrdersWithStatusPAID error: ' + err);
    return 'error in getUsers: ' + err;
  });
}
// connectToDb().Schema.Types.ObjectId
export function getUserByIds(ids) {
  return UsersModel.find({'_id': {$in: ids}}).exec(function(err, users) {
    if(!err) {
      return users;
    }
    console.log('getUserByIds: ' + err);
    return 'error in getUserByIds: ' + err;
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
      console.error('deleteOrder: ' + err);
      return 'error in deleteUser: ' + err;
    }
  });
}


