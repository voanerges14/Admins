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
import {connectToDb} from "./index";

function connectToDbProductsModel() {
  let mongoose = connectToDb();
  let Schema = mongoose.Schema;
  let Products = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    images: {type: String, required: true}
  });

  let ProductsModel = mongoose.model('Products', Products);
  return ProductsModel;
}

var ProductsModel = connectToDbProductsModel();

export function getProductById(id) {
  return ProductsModel.find({'_id': id}, function (err, product) {
    if(!err) {
      return product;
    }
    console.error('getProductById error: ' + err);
    return 'error in getProductById: ' + err;
  });
}
