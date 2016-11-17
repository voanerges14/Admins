import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as ordersActions from 'redux/modules/orders';
import {isLoaded, load as loadOrders} from 'redux/modules/orders';
import {initializeWithKey} from 'redux-form';
import {OrderForm} from 'components';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadOrders());
    }
  }
}])
@connect(
  state => ({
    orders: state.orders.data,
    toDeliveryBtn: state.orders.toDeliveryBtn,
    rejectOrderBtn: state.orders.rejectOrderBtn,
    error: state.orders.error,
    loading: state.orders.loading,
  }),
  {...ordersActions, initializeWithKey })
export default class Orders extends Component {
  static propTypes = {
    orders: PropTypes.array,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    toDeliveryBtn: PropTypes.object.isRequired,
    rejectOrderBtn: PropTypes.object.isRequired,
    applyStartSend: PropTypes.func.isRequired,
    applyStartReject: PropTypes.func.isRequired
  };

  render() {
    const handleApplySend = (order) => {
      const {applyStartSend} = this.props; // eslint-disable-line no-shadow
      return () => applyStartSend(String(order.id));
    };
    const handleApplyReject = (order) => {
      const {applyStartReject} = this.props; // eslint-disable-line no-shadow
      return () => applyStartReject(String(order.id));
    };
    const { orders, toDeliveryBtn, rejectOrderBtn, loading, load } = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Orders.scss');
    return (
      <div className={styles.widgets + ' container'}>
        <h1>
          Orders
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
            <i className={refreshClassName}/> {' '} Reload Orders
          </button>
        </h1>
        <Helmet title="Orders"/>
        {orders && orders.length &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th className={styles.idCol}>№</th>
            <th className={styles.colorCol}>Users</th>
            <th className={styles.sprocketsCol}>Products</th>
            <th className={styles.ownerCol}>Send to delivery</th>
            <th className={styles.buttonCol}>Reject order</th>
          </tr>
          </thead>
          <tbody>
          {
            orders.map((order) =>

              <tr key={order.id}>
                <td className={styles.idCol}>{order.id}</td>
                <td className={styles.colorCol}>{order.userName}</td>
                <td className={styles.sprocketsCol}>{order.product}</td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-primary" onClick={handleApplySend(order)}>
                      <i className="fa fa-pencil"/> Send
                  </button>
                </td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-danger" onClick={handleApplyReject(order)}>
                    <i className="fa fa-pencil"/> Cancel
                  </button>
                </td>
              </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}

