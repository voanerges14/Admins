const mockOrders = [
  {id: 1, userName: 'Pavlo',  productId: 7, product: 'Hp pavilion', status: 'PAID'},
  {id: 2, userName: 'Dmytro', productId: 1, product: 'Asus rog',    status: 'PAID'},
  {id: 3, userName: 'Ivan',   productId: 8, product: 'Acer e15',    status: 'PAID'},
  {id: 4, userName: 'Petro',  productId: 2, product: 'Lenovo p70',  status: 'PAID'}
];

export function getOrdersFromDb(req) {
  let orders = req.session.orders;
  if (!orders) {
    orders = mockOrders;
    req.session.orders = orders;
  }
  return orders;
}

export function get(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      try {
        resolve(getOrdersFromDb(req));
      }
      catch (e){
        reject(e);
      }
    }, 1000); // simulate async load
  });
}

export function apply(req) {
  return new Promise((resolve, reject) => {
    // write to database
    setTimeout(() => {
      try {
        get(req).then(data => {
          const orders = data;
          const order = req.body;
          order.product = {product: 'order.product, temp'};
          req.session.orders = orders;
          resolve(order);
        }, err => {
          reject(err);
        });
      }
      catch (e){
        reject(e);
      }
    }, 1500); // simulate async db write
  });
}
