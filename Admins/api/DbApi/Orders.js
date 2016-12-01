// collection Orders:
// {
//   "_id",
//     "userId",
//     "productId",
//     "status": 'IN_CART' || 'PAID' || 'DELIVERING' || 'DELIVERED'
// }
import {db} from "./index";

function connectToDbOrdersModel() {
  let Orders = new db.Schema({
    _id: { type: db.Schema.Types.ObjectId, required: true },
    userId: { type: db.Schema.Types.ObjectId, required: true },
    products: { type: db.Schema.Types.Array, required: true },
    status: {type: db.Schema.Types.String, required: true}
  });

  let OrdersModel = db.mongoose.model('Orders', Orders);
  return OrdersModel;
}

var OrdersModel = connectToDbOrdersModel();

export function getOrdersWithStatusPAID() {
  return OrdersModel.find({'status': 'PAID'}, function (err, orders) {
    if(!err) {
      return orders;
    }
    console.error('getOrdersWithStatusPAID error: ' + err);
    return 'error in getOrdersWithStatusPAID: ' + err;
  });
}

export function sendToDeliveryOrder(id) {
  return OrdersModel.findById(id, function (err, order) {
    if (err) {
      console.error('sendToDeliveryOrder error: ' + err);
      return 'error in sendToDeliveryOrder: ' + err;
    }
    order.status = 'DELIVERING';
    order.save(function (err, updatedOrder) {
      if (err) {
        console.error('sendToDeliveryOrder error: ' + err);
        return 'error in sendToDeliveryOrder: ' + err;
      }
      return updatedOrder;
    });
  });
}

export function deleteOrder(id) {
  return OrdersModel.remove({ _id: id }, function(err) {
    if (!err) {
      return 0;
    }
    else {
      console.error('deleteOrder error: ' + err);
      return 'error in deleteOrder: ' + err;
    }
  });
}


