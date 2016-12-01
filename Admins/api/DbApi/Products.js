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
import {db} from "./index";

function connectToDbProductsModel() {
  let Products = new db.Schema({
    _id: { type: db.Schema.Types.ObjectId, required: true },
    name: { type: db.Schema.Types.String, required: true },
    price: { type: db.Schema.Types.String, required: true },
    images: {type: db.Schema.Types.String, required: true}
  });

  let ProductsModel = db.mongoose.model('Products', Products);
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
