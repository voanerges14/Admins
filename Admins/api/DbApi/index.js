class connectToDb {
  constructor() {
    this.mongoose = require('mongoose');
    this.mongoose.connect('mongodb://main:mainmain@ds035995.mlab.com:35995/trueshop1997db');
    let db = this.mongoose.connection;

    db.on('error', function (err) {
      console.error('connection error:', err.message);
    });
    db.once('open', function callback() {
      console.info("Connected to DB!");
    });
    this.Schema = this.mongoose.Schema;
  }
}

export const db = new connectToDb();
