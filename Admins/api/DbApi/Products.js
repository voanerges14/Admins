import {db} from "./index";

function connectToDbProductsModel() {
  let Products = new db.Schema({
    _id: { type: db.Schema.Types.ObjectId, required: true },
    categoryId: { type: db.Schema.Types.String, required: true },
    name: { type: db.Schema.Types.String, required: true },
    price: { type: db.Schema.Types.String, required: true },
    inStock: { type: db.Schema.Types.String, required: true },
    images: {type: db.Schema.Types.String, required: true},
    description: {type: db.Schema.Types.String, required: true},
    // date: {type: db.Schema.Types.String, required: true},
    properties: {type: Array, required: true}
  });

  return db.mongoose.model('Products', Products);
}

const ProductsModel = connectToDbProductsModel();

export function getProductById(id) {
  return ProductsModel.find({'_id': id}, function (err, product) {
    if(!err) {
      return product;
    }
    console.error('getProductById error: ' + err);
    return 'error in getProductById: ' + err;
  });
}
