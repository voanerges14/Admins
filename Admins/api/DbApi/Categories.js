// collection Categories:
// {
//   "_id",
//     "userId",
//     "productId",
//     "status": 'IN_CART' || 'PAID' || 'DELIVERING' || 'DELIVERED'
// }

function connectToDbCategoriesModel() {
  let mongoose = require('mongoose');
  mongoose.connect('mongodb://main:mainmain@ds035995.mlab.com:35995/trueshop1997db');
  let db = mongoose.connection;

  db.on('error', function (err) {
    console.error('connection error:', err.message);
  });
  db.once('open', function callback () {
    console.info("Connected to DB!");
  });

  let Schema = mongoose.Schema;

  let Categories = new Schema({
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    status: {type: String, required: true}
  });

  let CategoriesModel = mongoose.model('Categories', Categories);

  return CategoriesModel;
}

export function getCategoriesWithStatusPAID() {
  let CategoriesModel = connectToDbCategoriesModel();
  return CategoriesModel.find({status: 'PAID', callback});
}

export function sendToDeliveryOrder(id) {
  let CategoriesModel = connectToDbCategoriesModel();
  return CategoriesModel.findById(id, function (err, category) {
    if (err) {
      console.error('sendToDeliveryOrder error: ' + err);
      return -1;
    }
    category.status = 'DELIVERING';
    category.save(function (err, updatedOrder) {
      if (err) {
        console.error('sendToDeliveryOrder error: ' + err);
        return -1;
      }
      return updatedOrder;
    });
  });
}

export function deleteOrder(id) {
  let OrderModel = connectToDbCategoriesModel();
  return OrderModel.remove({ _id: id }, function(err) {
    if (!err) {
      return 0;
    }
    else {
      console.error('deleteOrder: ' + err);
    }
  });
}


