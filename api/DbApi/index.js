class ConnectToDb {
  constructor() {
    this.mongoose = require('mongoose');
    this.mongoose.connect('mongodb://main:mainmain@ds035995.mlab.com:35995/trueshop1997db');
    const db = this.mongoose.connection;

    db.on('error', function(err) {
      console.error('==> Connection error:', err.message);
    });
    db.once('open', function callback() {
      console.info('==>  Connected to DB!');
    });
    this.Schema = this.mongoose.Schema;
  }
}
export const db = new ConnectToDb();
