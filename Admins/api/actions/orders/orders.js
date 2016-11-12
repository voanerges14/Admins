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

export default function orders(req) {
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
