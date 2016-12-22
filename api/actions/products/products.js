import * as ProductsDB from './../../DbApi/Products';
import * as CategoryDB from './../../DbApi/Categories';

export function get(req) {
  return new Promise((resolve, reject) => {
    CategoryDB.getCategories().then(data => {
      let ids = findNode(req.body._id, data);
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
    ProductsDB.addProduct(product).then(product => {
      resolve({product});
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
      '_id': req.body._id,
      'name': req.body.product.name,
      'price': req.body.product.price,
      'inStock': req.body.product.inStock,
      'description': req.body.product.description,
    };
    ProductsDB.editProduct(product).then(product => {
      ProductsDB.getProductById(req.body._id).then(product => {
        resolve({product});
      });
    }).catch(error => {
      reject('error in edit: ' + error);
    });
  });
}

export function addImg(req) {
  return new Promise((resolve, reject) => {
    ProductsDB.addImg(req.body.productId, encodeURIComponent(req.body.img)).then(product => {
      resolve({'_id': req.body.productId});
    }).catch(error => {
      reject('error in addImg: ' + error);
    });
  });
}

export function removeImg(req) {
  return new Promise((resolve, reject) => {
    ProductsDB.removeImg(req.body.productId, req.body.img).then(() => {
      ProductsDB.getProductById(req.body.productId).then(product => {
        resolve({'images': product.images});
      }).catch(error => {
        reject('error in removeImg: ' + error);
      });
    }).catch(error => {
      reject('error in removeImg: ' + error);
    });
  });
}

export function getProperties(req) {
  return new Promise((resolve, reject) => {
    CategoryDB.getCategories().then(data => {
      let ids = findParents(req.body.categoryId, data);
      CategoryDB.getCategoriesByIds(ids).then(categories => {
        let properties = [];
        for(let i = 0; i < categories.length; ++i) {
          properties = properties.concat(categories[i].properties);
        }
        for(let i = 0; i < properties.length; ++i) {
          properties[i] = {'name': properties[i].name, 'value': ""};
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
    ProductsDB.editDescription(req.body._id, req.body.description).then(() => {
      ProductsDB.getProductById(req.body._id).then(product => {
        resolve({product: product});
      });
    }).catch(error => {
      reject('error in editDescription: ' + error);
    });
  });
}

export function editProperty(req) {
  return new Promise((resolve, reject) => {
    ProductsDB.editProperty(req.body._id, req.body.properties).then(() => {
      ProductsDB.getProductById(req.body._id).then(product => {
        resolve({product});
      });
    }).catch(error => {
      reject('error in editProperty: ' + error);
    });
  });
}

export function findNode(id, data) {
  let ids = [id];
  findNode2(id);
  function findNode2(id) {
    for (let i = 0; i < data.length; ++i) {
      if (data[i].parentId === id) {
        ids.push(data[i]._id);
        findNode2(data[i]._id);
      }
    }
  }
  return ids;
}

export function findParents(id, data) {
  let ids = [];
  findParent2(id);
  function findParent2(id) {
    if (id === '0') { return; }
    for (let i = 0; i < data.length; ++i) {
      if (id == data[i]._id) {
        ids.push(id);
        findParent2(data[i].parentId);
      }
    }
  }
  return ids;
}
