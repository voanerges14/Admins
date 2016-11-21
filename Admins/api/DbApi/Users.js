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
function connectToDbUsersModel() {
  let mongoose = require('mongoose');
  mongoose.connect('mongodb://main:mainmain@ds035995.mlab.com:35995/trueshop1997db');
  let db = mongoose.connection;

  db.on('error', function (err) {
    console.error('connection error:', err.message);
  });
  db.once('open', function callback () {
    console.info("Connected to DB!");
  });

  let Schema = mongoose.Schema;

  let Users = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  });

  let UsersModel = mongoose.model('Users', Users);
  return UsersModel;
}

var UsersModel = connectToDbUsersModel();

export function getUserById(id) {
  return UsersModel.find({'_id': id}, function (err, user) {
    if(!err) {
      return user;
    }
    console.error('getUserById error: ' + err);
    return err;
  });
}

export function deleteUser(id) {
  return UsersModel.remove({ _id: id }, function(err) {
    if (!err) {
      return 0;
    }
    else {
      console.error('deleteOrder: ' + err);
      return err;
    }
  });
}


