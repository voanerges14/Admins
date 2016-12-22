import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as ordersActions from 'redux/modules/orders';

@connect(
    state => ({
      orders: state.orders.dataPaid,
      toDeliveryBtn: state.orders.toDeliveryBtn,
      rejectOrderBtn: state.orders.rejectOrderBtn
    }),
    {...ordersActions})

export default class Orders extends Component {
  static propTypes = {
    orders: PropTypes.array,
    toDeliveryBtn: PropTypes.object.isRequired,
    rejectOrderBtn: PropTypes.object.isRequired,
    startSend: PropTypes.func.isRequired,
    startReject: PropTypes.func.isRequired,
    stopSend: PropTypes.func.isRequired,
    stopReject: PropTypes.func.isRequired,
    rejectOrder: PropTypes.func.isRequired,
    toDeliveryOrder: PropTypes.func.isRequired,
  };

  render() {
    const {
        orders, toDeliveryBtn, rejectOrderBtn, rejectOrder, toDeliveryOrder,
        startSend, stopSend, startReject, stopReject
    } = this.props;

    const sendBtn = (formKey) => {
      return (typeof toDeliveryBtn[formKey] === 'undefined') ? false : toDeliveryBtn[formKey];
    };

    const rejectBtn = (formKey) => {
      return (typeof rejectOrderBtn[formKey] === 'undefined') ? false : rejectOrderBtn[formKey];
    };

    const styles = require('./Orders.scss');

    return (
      <div>
        {(orders && orders.length) ?
          <table className="table table-striped">
            <thead>
            <tr>
              <th className={styles.idOrdersCol}>№</th>
              <th className={styles.userColMain}>Users</th>
              <th className={styles.productsColMain}>Products</th>
              <th className={styles.totalCol}>Total</th>
              <th className={styles.sendCol}>Send to delivery</th>
              <th className={styles.rejectCol}>Reject order</th>
            </tr>
            </thead>
            <tbody>
              {
                orders.map((order, indx) =>
                  <tr key={order.id}>
                    <td className={styles.idOrdersCol} id={order.id}>
                      { indx + 1 }.
                    </td>

                    <td className={styles.userCol}>
                      <p>{ order.user.firstName + ' ' + order.user.lastName }</p>
                      <p>{ order.user.email }</p>
                      <p>{ order.user.phoneNumber }</p>
                    </td>

                    <td className={styles.productsCol}>
                      {
                        order.products.map((elem, index) =>
                          <div key={ elem._id }>
                            {index + 1 + '. ' + elem.name + ' --- ' + elem.quantity}
                          </div>
                        )
                      }
                    </td>

                    <td className={styles.totalCol}>
                      { order.total }
                    </td>

                    <td className={styles.sendCol}>
                      {!sendBtn(order.id) &&
                      < button className="btn btn-primary btn-sm" onClick={() => startSend(order.id)}>
                        <i className="fa fa-pencil"/> Send
                      </button>
                      }
                      {sendBtn(order.id) &&
                      <div>
                        <button className="btn btn-success btn-sm" onClick={() => toDeliveryOrder(order.id)}>
                          <i className={'glyphicon glyphicon-ok'}/>
                        </button>
                        <button className="btn btn-default btn-sm" onClick={() => stopSend(order.id)}>
                          <i className="glyphicon glyphicon-remove"/>
                        </button>
                      </div>
                      }
                    </td>

                    <td className={styles.rejectCol}>
                      {!rejectBtn(order.id) &&
                        <button className="btn btn-danger btn-sm" onClick={() => startReject(order.id)}>
                          <i className="glyphicon glyphicon-remove"/> Cancel
                        </button>
                      }

                      {rejectBtn(order.id) &&
                        <div>
                          <button className="btn btn-success btn-sm" onClick={() => rejectOrder(order.id)}>
                            <i className={'glyphicon glyphicon-ok'}/>
                          </button>
                          <button className="btn btn-default btn-sm" onClick={() => stopReject(order.id)}>
                            <i className="glyphicon glyphicon-remove"/>
                          </button>
                        </div>
                      }
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
          :
          <div>We don't have orders with status paid</div>
        }
      </div>
    );
  }
}

