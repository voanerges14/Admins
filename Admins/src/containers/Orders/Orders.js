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
    apply: state.orders.apply,
    error: state.orders.error,
    loading: state.orders.loading,
  }),
  {...ordersActions, initializeWithKey })
export default class Orders extends Component {
  static propTypes = {
    orders: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    apply: PropTypes.object.isRequired,
    applyStart: PropTypes.func.isRequired
  };

  render() {
    const handleApply = (order) => {
      const {applyStart} = this.props; // eslint-disable-line no-shadow
      return () => applyStart(String(order.id));
    };
    const { orders, error, apply, loading, load } = this.props;
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
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
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
            orders.map((order) => apply[order.id] ?
              <OrderForm formKey={String(order.id)} key={String(order.id)} initialValues={order}/> :
              <tr key={order.id}>
                <td className={styles.idCol}>{order.id}</td>
                <td className={styles.colorCol}>{order.userName}</td>
                <td className={styles.sprocketsCol}>{order.product}</td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-primary" onClick={handleApply(order)}>
                      <i className="fa fa-pencil"/> Edit
                  </button>
                </td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-danger" onClick={handleApply(order)}>
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

