import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as ordersActions from 'redux/modules/orders';

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
    const {orders} = this.props;
    const styles = require('./Orders.scss');

    return (
      <div>
        <table className="table table-striped">
          <thead>
          <tr>
            <th className={styles.idOrdersCol}>№</th>
            <th className={styles.userColMain}>Users</th>
            <th className={styles.productsColMain}>Products</th>
            <th className={styles.totalCol}>Total</th>
            <th className={styles.sendCol}>Order status</th>
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
                        {index + 1 + '. ' + elem.name + ' --- ' + elem.quantity }
                      </div>
                    )
                  }
                </td>

                <td className={styles.totalCol}>
                  { order.total }
                </td>

                <td className={styles.statusCol}>
                  { order.status }
                </td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

