import * as OrdersDb from './../../DbApi/Orders';
const mockOrders = [
  {id: 1, userName: 'Pavlo',  productId: 7, product: 'Hp pavilion', status: 'PAID'},
  {id: 2, userName: 'Dmytro', productId: 1, product: 'Asus rog',    status: 'PAID'},
  {id: 3, userName: 'Ivan',   productId: 8, product: 'Acer e15',    status: 'PAID'},
  {id: 4, userName: 'Petro',  productId: 2, product: 'Lenovo p70',  status: 'PAID'}
];

function getOrdersFromDb() {
  const temp = OrdersDb.getOrdersWithStatusPAID();
  console.log('test db: ' + temp);
  // return mockOrders;
  return temp;
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

export default function apply(req) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      getOrdersFromDb().then(data => {
        const orders = data;
        for(let order in orders){
          if(order.id == req.body.id){
            order.status = 'DELIVERING';
            resolve(order);
          }
        }
      }, err => {
        reject(err);
      });
    }, 1500); // simulate async db write
  });
}
