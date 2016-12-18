import {db} from "./index";

function connectToDbProductsModel() {
  let Products = new db.Schema({
    _id: {type: db.Schema.Types.ObjectId, required: true},
    categoryId: {type: db.Schema.Types.String, required: true},
    name: {type: db.Schema.Types.String, required: true},
    price: {type: db.Schema.Types.String, required: true},
    inStock: {type: db.Schema.Types.String, required: true},
    images: {type: Array, required: true},
    description: {type: db.Schema.Types.String, required: true},
    date: {type: db.Schema.Types.String, required: true},
    properties: {type: Array, required: true}
  });
  return db.mongoose.model('Products', Products);
}

const ProductsModel = connectToDbProductsModel();

export function getProductByCategoriesIds(ids) {
  return ProductsModel.find({'categoryId': {$in: ids}}, function (err, product) {
    if (!err) {
      return product;
    }
    console.error('getProductByCategoriesIds error: ' + err);
    return 'error in getProductByCategoriesIds: ' + err;
  });
}

export function getProductByCategoryId(id) {
  return ProductsModel.find({'categoryId': id}, function (err, product) {
    if (!err) {
      return product;
    }
    console.error('getProductByCategoryId error: ' + err);
    return 'error in getProductByCategoryId: ' + err;
  });
}

export function deleteProduct(id) {
  return ProductsModel.remove({_id: id}, function (err) {
    if (!err) {
      return 0;
    }
    else {
      console.error('deleteProduct: ' + err);
      return 'error in deleteProduct: ' + err;
    }
  });
}

export function addProduct(product) {
  return ProductsModel.create(product, function (err) {
    if (!err) {
      return ProductsModel.findOne({}, {}, {sort: {'created_at': -1}}, function (err, product) {
        if (!err) {
          return product;
        }
        else {
          console.error('addProduct error1: ' + err);
          return 'error1 in addProduct: ' + err;
        }
      });
    }
    else {
      console.error('addProduct error2: ' + err);
      return 'error2 in addProduct: ' + err;
    }
  });
}

export function editProduct(productNew) {
  return ProductsModel.findById(productNew.id, function (err, product) {
    if (err) {
      console.error('editProduct error1: ' + err);
      return 'error1 in editProduct: ' + err;
    }
    product.categoryId = productNew.categoryId;
    product.name = productNew.name;
    product.price = productNew.price;
    product.inStock = productNew.inStock;
    product.images = productNew.images;
    product.description = productNew.description;
    product.properties = productNew.properties;
    product.save(function (err, updatedProduct) {
      if (err) {
        console.error('editProduct error2: ' + err);
        return 'error2 in editProduct: ' + err;
      }
      return updatedProduct;
    });
  });
}

export function addImg(_id, img) {
  return ProductsModel.findById(_id, function (err, product) {
    if (err) {
      console.error('addImg error1: ' + err);
      return 'error1 in addImg: ' + err;
    }
    console.log('product ' + JSON.stringify(product, null, 4));
    console.log('_id: ' + JSON.stringify(_id, null, 4));
    product.images.push(img);
    product.save(function (err, updatedProduct) {
      if (err) {
        console.error('addImg error2: ' + err);
        return 'error2 in addImg: ' + err;
      }
      return updatedProduct;
    });
  });
}

export function removeImg(_id, img) {
  return ProductsModel.findById(_id, function (err, product) {
    if (err) {
      console.error('removeImg error1: ' + err);
      return 'error1 in removeImg: ' + err;
    }
    for (let index = 0; index < product.images.length; ++index) {
      if (product.images[index] === img) {
        product.images.splice(index, 1);
        break;
      }
    }
    product.save(function (err, updatedProduct) {
      if (err) {
        console.error('removeImg error2: ' + err);
        return 'error2 in removeImg: ' + err;
      }
      return updatedProduct;
    });
  });
}
