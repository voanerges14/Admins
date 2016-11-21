// collection Orders:
// {
//   "_id",
//     "userId",
//     "productId",
//     "status": 'IN_CART' || 'PAID' || 'DELIVERING' || 'DELIVERED'
// }
// when close connections?
function connectToDbOrdersModel() {
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

  let Orders = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    status: {type: String, required: true}
  });

  let OrdersModel = mongoose.model('Orders', Orders);
  return OrdersModel;
}

var OrdersModel = connectToDbOrdersModel();

export function getOrdersWithStatusPAID() {
  return OrdersModel.find({'status': 'PAID'}, function (err, orders) {
    if(!err) {
      return orders;
    }
    console.error('getOrdersWithStatusPAID error: ' + err);
    return err;
  });
}

export function sendToDeliveryOrder(id) {
  return OrdersModel.findById(id, function (err, order) {
    if (err) {
      console.error('sendToDeliveryOrder error: ' + err);
      return -1;
    }
    order.status = 'DELIVERING';
    order.save(function (err, updatedOrder) {
      if (err) {
        console.error('sendToDeliveryOrder error: ' + err);
        return err;
      }
      return updatedOrder;
    });
  });
}

export function deleteOrder(id) {
  return OrderModel.remove({ _id: id }, function(err) {
    if (!err) {
      return 0;
    }
    else {
      console.error('deleteOrder: ' + err);
    }
  });
}


