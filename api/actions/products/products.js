import * as ProductsDB from './../../DbApi/Products';
import * as CategoryDB from './../../DbApi/Categories';

export function get(req) {
  return new Promise((resolve, reject) => {
    CategoryDB.getCategories().then(data => {
      let ids = findNode(req.body.id, data);
      let actions = [];

      for(let i = 0; i < ids.length; ++i) {
          actions.push(ProductsDB.getProductByCategoryId(ids[i]));
      }
      Promise.all(actions).then(products => {
          console.log('products: ' + products);
          resolve(products);
      })
    }).catch(error => {
        reject('error in get: ' + error);
    });
  });
}

export function add(req) {
  return new Promise((resolve, reject) => {
    let categoryId =  req.body.product.categoryId;
    let name = req.body.product.name;
    let price = req.body.product.price;
    let inStock = req.body.product.inStock;
    let images = req.body.product.images;
    let description = req.body.product.description;
    let properties = req.body.product.properties;
    ProductsDB.addProduct(categoryId, name, price, inStock, images, description, properties).then(product => {
      resolve({'_id': product._id});
    }).catch(error => {
      reject('error in add: ' + error);
    });
  });
}

export function remove(req) {
  return new Promise((resolve, reject) => {
    ProductsDB.deleteProduct(req.body.id).then(() => {
      resolve({'id': req.body.id});
    }).catch(error => {
      reject('error in remove: ' + error);
    });
  });
}

export function edit(req) {
  return new Promise((resolve, reject) => {
    const product = {
      '_id': req.body.product._id,
      'firstName': req.body.product.firstName,
      'lastName': req.body.product.lastName,
      'email': req.body.product.email,
      'password': req.body.product.password,
      'phone': req.body.product.phone,
      'address': req.body.product.address,
      'admin': req.body.product.admin
    };
    ProductsDB.editProduct(product).then(product => {
      resolve({'id': product._id});
    }).catch(error => {
      reject('error in edit: ' + error);
    });
  });
}

function findNode(id, data) {
  let ids = [id];
  findNode2(id);

  function findNode2(id) {
    for(let i = 0; i < data.length; ++i) {
      if(data[i].parentId === id) {
        ids.push(data[i]._id);
        findNode2(data[i]._id);
      }
    }
  }
  return ids;
}
