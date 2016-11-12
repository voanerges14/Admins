// collection Products:
// {
//   "_id",
//   "categoryId",
//   "name": String,
//   "price": Number,
//   "inStock": Number,
//   "images": Array of strings,
//   "дата випуску/дата з'явлення в шопі": Date,
//   "snippet": String,
//   "description": String,
//   "additionalFeatures": String,
//   "properties": [
//   ...
//   ]
// }

export function getProductById(req) {
  let products;
  let url = 'mongodb://main:mainmain@ds035995.mlab.com:35995/trueshop1997db';
  require('mongodb').MongoClient.connect(url, function (err, db) {
    if (!err) {
      console.log('All OK');

      db.collection('product').find({_id: req}).toArray(function (err, res) {
        if (res.length) {
          console.log(res);
          products = res;
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
  return products;
}
