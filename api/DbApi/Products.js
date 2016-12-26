import {db} from './index';

function connectToDbProductsModel() {
  const Products = new db.Schema({
    categoryId: {type: db.Schema.Types.String, required: true},
    name: {type: db.Schema.Types.String, required: true},
    price: {type: db.Schema.Types.String, required: true},
    inStock: {type: db.Schema.Types.String, required: true},
    images: {type: Array},
    description: {type: db.Schema.Types.String, required: true},
    date: { type: Date, default: Date.now() },
    properties: {type: Array}
  });
  return db.mongoose.model('Products', Products);
}

const ProductsModel = connectToDbProductsModel();

export function getProductByCategoriesIds(ids) {
  return new Promise((resolve, reject) => {
    ProductsModel.find({'categoryId': {$in: ids}}).then(products => {
      resolve(products);
    }).catch(err => {
      console.error('getProductByCategoriesIds error: ' + err);
      reject('error in getProductByCategoriesIds: ' + err);
    });
  });
}

export function getProductById(id) {
  return new Promise((resolve, reject) => {
    ProductsModel.findById(id).then(product => {
      resolve(product);
    }).catch(err => {
      console.error('getProductById error: ' + err);
      reject('error in getProductById: ' + err);
    });
  });
}

export function getProductByCategoryId(id) {
  return new Promise((resolve, reject) => {
    ProductsModel.find({'categoryId': id}).then(product => {
      resolve(product);
    }).catch(err => {
      console.error('getProductByCategoryId error: ' + err);
      reject('error in getProductByCategoryId: ' + err);
    });
  });
}

export function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    ProductsModel.remove({ _id: id }).then(() => {
      resolve();
    }).catch(err => {
      console.error('deleteProduct: ' + err);
      reject('error in deleteProduct: ' + err);
    });
  });
}

export function addProduct(product) {
  return new Promise((resolve, reject) => {
    const newProduct = new ProductsModel(product);
    newProduct.save().then(addedProduct => {
      resolve(addedProduct);
    }).catch(err => {
      console.error('addProduct error: ' + err);
      reject('error in addProduct: ' + err);
    });
  });
}

export function editProduct(id, productNew) {
  return new Promise((resolve, reject) => {
    ProductsModel.findById(id).then(product => {
      Object.assign(product, productNew);
      product.save().then(updatedProduct => {
        resolve(updatedProduct);
      });
    }).catch(err => {
      console.error('editProduct error: ' + err);
      reject('error in editProduct: ' + err);
    });
  });
}

export function editDescription(id, description) {
  return new Promise((resolve, reject) => {
    ProductsModel.findOneAndUpdate({'_id': id}, {$set: {'description': description}}, {new: true})
      .then(updatedProduct => {
        resolve(updatedProduct);
      }).catch(err => {
        console.error('editDescription error: ' + err);
        reject('error in editDescription: ' + err);
      });
  });
}

export function editProperty(id, properties) {
  return new Promise((resolve, reject) => {
    ProductsModel.findOneAndUpdate({'_id': id}, {$set: {'properties': properties}}, {new: true})
        .then(updatedProduct => {
          resolve(updatedProduct);
        }).catch(err => {
          console.error('editDescription error: ' + err);
          reject('error in editDescription: ' + err);
        });
  });
}

export function addImg(_id, img) {
  return new Promise((resolve, reject) => {
    ProductsModel.findById(_id).then(product => {
      product.images.push(img);
      product.save().then(updatedProduct => {
        resolve(updatedProduct);
      });
    }).catch(err => {
      console.error('addImg error: ' + err);
      reject('error in addImg: ' + err);
    });
  });
}

export function removeImg(_id, img) {
  return new Promise((resolve, reject) => {
    ProductsModel.findById(_id).then(product => {
      const index = product.images.findIndex(function(elem) {return elem.toString() === img;});
      product.images.splice(index, 1);
      product.save().then(updatedProduct => {
        resolve(updatedProduct);
      });
    }).catch(err => {
      console.error('removeImg error: ' + err);
      reject('error in removeImg: ' + err);
    });
  });
}
