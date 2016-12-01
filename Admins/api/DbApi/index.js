var firstLoad = false;
var mongoose = null;
export function connectToDb() {
  if(!firstLoad) {
    mongoose = require('mongoose');
    mongoose.connect('mongodb://main:mainmain@ds035995.mlab.com:35995/trueshop1997db');
    let db = mongoose.connection;

    db.on('error', function (err) {
      console.error('connection error:', err.message);
    });
    db.once('open', function callback() {
      console.info("Connected to DB!");
    });
    firstLoad = true;
  }
  return mongoose;
}