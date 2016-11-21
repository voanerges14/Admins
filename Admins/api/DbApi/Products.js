// collection Products:
// {
//   "_id",
//   "categoryId",
//   "name": String,
//   "price": Number,
//   "inStock": Number,
//   "images": Array of strings,
//   "дата випуску/дата з'явлення в шопі": Date,
//   "snippet": String,
//   "description": String,
//   "additionalFeatures": String,
//   "properties": [
//   ...
//   ]
// }
// when close connections?
function connectToDbOrdersModel() {
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

  let Products = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    images: {type: Schema.Types.array, required: true}
  });

  let ProductsModel = mongoose.model('Orders', Products);
  return ProductsModel;
}

var ProductsModel = connectToDbOrdersModel();

export function getProductById(id) {
  return ProductsModel.find({'_id': id}, function (err, product) {
    if(!err) {
      return product;
    }
    console.error('getProductById error: ' + err);
    return err;
  });
}
