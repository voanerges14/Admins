// collection Orders:
// {
//   "_id",
//     "userId",
//     "productId",
//     "status": 'IN_CART' || 'PAID' || 'DELIVERING' || 'DELIVERED'
// }

export function getOrdersWithStatusPAID(req) {
  let orders;
  let url = 'mongodb://main:mainmain@ds035995.mlab.com:35995/trueshop1997db';
  require('mongodb').MongoClient.connect(url, function (err, db) {
    if (!err) {
      console.log('All OK');

      db.collection('orders').find({status: 'PAID'}).toArray(function (err, res) {
        if (res.length) {
          console.log(res);
          orders = res;
        }
        else if (err) {
          console.log(err);
        }
        else {
          console.log('No document(s) found with defined "find" criteria!');
        }
        db.close();
      })
    }
    else {
      console.log('Unable to connect', err);
    }
  });
  return orders;
}


