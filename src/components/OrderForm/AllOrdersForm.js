import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as ordersActions from 'redux/modules/orders';
// import {isLoaded, loadAll as loadOrders} from 'redux/modules/orders';
// import { asyncConnect } from 'redux-async-connect';
// @asyncConnect([{
//   deferred: true,
//   promise: ({store: {dispatch, getState}}) => {
//     if (!isLoaded(getState())) {
//       return dispatch(loadOrders());
//     }
//   }
// }])

@connect(
    state => ({
      orders: state.orders.dataAll
    }),
    {...ordersActions})

export default class Orders extends Component {
  static propTypes = {
    orders: PropTypes.array
  };

  render() {
    const { orders } = this.props;
    const styles = require('./Orders.scss');

    return (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className={styles.idOrdersCol}>№</th>
                <th className={styles.userColMain}>Users</th>
                <th className={styles.productsColMain}>Products</th>
                <th className={styles.sendCol}>Order status</th>
              </tr>
            </thead>
            <tbody>
              { orders.map((order, indx) =>
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
                    {order.products.map((elem, index) =>
                      <div key={ elem._id }>
                        <span className={styles.productNumber} id={ elem._id }>
                          { index + 1 + '. '}
                        </span>

                        <span className={styles.productName} id={ index }>
                          { elem.name + ' --- ' + elem.quantity }
                        </span>
                      </div>
                    ) }
                  </td>

                  <td className={styles.statusCol}>
                    { order.status }
                  </td>
                </tr>
              ) }
            </tbody>
          </table>
        </div>
    );
  }
}

