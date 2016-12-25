import * as ProductsDB from './../../DbApi/Products';
import * as CategoryDB from './../../DbApi/Categories';

export function findNode(id, data) {
  const ids = [id];
  function findNode2(_id) {
    for (let index = 0; index < data.length; ++index) {
      if (data[index].parentId === _id) {
        ids.push(data[index]._id);
        findNode2(data[index]._id);
      }
    }
  }
  findNode2(id);
  return ids;
}
export function findParents(id, data) {
  const ids = [];
  function findParent2(_id) {
    if (_id === '0') { return; }
    for (let index = 0; index < data.length; ++index) {
      if (_id.toString() === data[index]._id.toString()) {
        ids.push(_id);
        findParent2(data[index].parentId);
      }
    }
  }
  findParent2(id);
  return ids;
}

export function get(req) {
  return new Promise((resolve, reject) => {
    CategoryDB.getCategories().then(data => {
      const ids = findNode(req.body._id, data);
      ProductsDB.getProductByCategoriesIds(ids).then(products => {
        resolve(products);
      });
    }).catch(error => {
      reject('error in get: ' + error);
    });
  });
}

export function add(req) {
  return new Promise((resolve, reject) => {
    const product = {
      'categoryId': req.body.categoryId,
      'name': req.body.product.name,
      'price': req.body.product.price,
      'inStock': req.body.product.inStock,
      'images': encodeURIComponent(req.body.product.images),
      'description': req.body.product.description,
      'properties': req.body.product.properties
    };
    ProductsDB.addProduct(product).then(newProduct => {
      resolve({'product': newProduct});
    }).catch(error => {
      reject('error in add: ' + error);
    });
  });
}

export function remove(req) {
  return new Promise((resolve, reject) => {
    ProductsDB.deleteProduct(req.body._id).then(() => {
      resolve({'_id': req.body._id});
    }).catch(error => {
      reject('error in remove: ' + error);
    });
  });
}

export function edit(req) {
  return new Promise((resolve, reject) => {
    const product = {
      'name': req.body.product.name,
      'price': req.body.product.price,
      'inStock': req.body.product.inStock,
      'description': req.body.product.description,
    };
    ProductsDB.editProduct(req.body._id, product).then(newProduct => {
      resolve({'product': newProduct});
    }).catch(error => {
      reject('error in edit: ' + error);
    });
  });
}

export function addImg(req) {
  return new Promise((resolve, reject) => {
    ProductsDB.addImg(req.body.productId, encodeURIComponent(req.body.img)).then(() => {
      resolve({'_id': req.body.productId});
    }).catch(error => {
      reject('error in addImg: ' + error);
    });
  });
}

export function removeImg(req) {
  return new Promise((resolve, reject) => {
    ProductsDB.removeImg(req.body.productId, req.body.img.toString()).then(product => {
      resolve({'images': product.images});
    }).catch(error => {
      reject('error in removeImg: ' + error);
    });
  });
}

export function getProperties(req) {
  return new Promise((resolve, reject) => {
    CategoryDB.getCategories().then(data => {
      const ids = findParents(req.body.categoryId, data);
      CategoryDB.getCategoriesByIds(ids).then(categories => {
        let properties = [];
        for (let index = 0; index < categories.length; ++index) {
          properties = properties.concat(categories[index].properties);
        }
        for (let index = 0; index < properties.length; ++index) {
          properties[index] = {'name': properties[index].name, 'value': ''};
        }
        resolve(properties);
      });
    }).catch(error => {
      reject('error in DelImg: ' + error);
    });
  });
}

export function editDescription(req) {
  return new Promise((resolve, reject) => {
    ProductsDB.editDescription(req.body._id, req.body.description).then(product => {
      resolve({product});
    }).catch(error => {
      reject('error in editDescription: ' + error);
    });
  });
}

export function editProperty(req) {
  return new Promise((resolve, reject) => {
    ProductsDB.editProperty(req.body._id, req.body.properties).then(product => {
      resolve({product});
    }).catch(error => {
      reject('error in editProperty: ' + error);
    });
  });
}
