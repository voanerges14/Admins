import * as ProductsDB from './../../DbApi/Products';
import * as CategoryDB from './../../DbApi/Categories';

export function get(req) {
  return new Promise((resolve, reject) => {
    // console.log('getProduct: ' + JSON.stringify(req.body));
    CategoryDB.getCategories().then(data => {
      let ids = findNode(req.body._id, data);
      // console.log('ids: ' + JSON.stringify(ids));
      // let actions = [];

      ProductsDB.getProductByCategoriesIds(ids).then(products => {
        // console.log('products: ' + products);
        resolve(products);
      });
      // for (let i = 0; i < ids.length; ++i) {
      //   actions.push(ProductsDB.getProductByCategoryId(ids[i]));
      // }
      // Promise.all(actions).then(products => {
      //   console.log('products: ' + products);
      //   resolve(products);
      // })
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
      'images': req.body.product.images,
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
      'categoryId': req.body.product.categoryId,
      'name': req.body.product.name,
      'price': req.body.product.price,
      'inStock': req.body.product.inStock,
      'images': req.body.product.images,
      'description': req.body.product.description,
      'properties': req.body.product.properties
    };
    ProductsDB.editProduct(product).then(product => {
      resolve({'_id': product._id});
    }).catch(error => {
      reject('error in edit: ' + error);
    });
  });
}

export function addImg(req) {
  return new Promise((resolve, reject) => {
    // console.log("req " +  JSON.stringify(req.body));
    ProductsDB.addImg(req.body.productId, encodeURIComponent(req.body.img)).then(product => {
      resolve({'_id': req.body.productId});
    }).catch(error => {
      reject('error in addImg: ' + error);
    });
  });
}

export function removeImg(req) {
  console.log("come to server" + JSON.stringify(req.body, null, 4));
  return new Promise((resolve, reject) => {
    ProductsDB.removeImg(req.body.productId, req.body.img).then(product => {
      console.log("come from server " + JSON.stringify(product.images, null, 4));
      resolve({'images': product.images});
    }).catch(error => {
      reject('error in DelImg: ' + error);
    });
  });
}

function findNode(id, data) {
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
