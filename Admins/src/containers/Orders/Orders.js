import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as ordersActions from 'redux/modules/orders';
import {isLoaded, load as loadOrders} from 'redux/modules/orders';
import {initializeWithKey} from 'redux-form';
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
    applyStartReject: PropTypes.func.isRequired,
    applyStopSend: PropTypes.func.isRequired,
    applyStopReject: PropTypes.func.isRequired,
    rejectOrder: PropTypes.func.isRequired,
    toDeliveryOrder: PropTypes.func.isRequired,
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
    const { orders, toDeliveryBtn, rejectOrderBtn, loading, load,
      applyStopSend, applyStopReject, rejectOrder, toDeliveryOrder } = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Orders.scss');
    return (
      <div className={styles.orders + ' container'}>
        <h1>
          Orders
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
            <i className={refreshClassName}/> {' '} Reload Orders
          </button>
        </h1>
        <Helmet title="Orders"/>
        {orders && orders.length &&
        <table className="table table-striped">
          <thead> <tr>
            <th className={styles.idOrdersCol}>№</th>
            <th className={styles.userColMain}>Users</th>
            <th className={styles.productsColMain}>Products</th>
            <th className={styles.sendCol}>Send to delivery</th>
            <th className={styles.rejectCol}>Reject order</th>
          </tr> </thead>
          <tbody>
          { orders.map((order, ind) =>
            <tr key={order.id}>
              <td className={styles.idOrdersCol}>
                { ind + 1 }.
              </td>
              <td className={styles.userCol}>
                <p>{ order.user.firstName + ' ' + order.user.lastName }</p>
                <p>{ order.user.email }</p>
                <p>{order.user.phoneNumber}</p>
              </td>
              <td className={styles.productsCol}>
                {order.products.map((elem, index) =>
                  <div key={ elem.product._id }>
                    <span className={styles.productNumber} id={ elem.product._id }>
                      { index + 1 }.
                    </span>
                    <span className={styles.productName} id={ index }>
                      { elem.product.name } --- {elem.quantity}
                    </span>
                  </div>)}
              </td>
              <td className={styles.buttonCol}>
                {!toDeliveryBtn[order.id] &&
                < button className="btn btn-primary btn-sm" onClick={handleApplySend(order)}>
                  <i className="fa fa-pencil"/> Send
                </button>}
                {toDeliveryBtn[order.id] && <div>
                <button className="btn btn-success btn-sm"
                        onClick={() => toDeliveryOrder(order.id)}>
                  <i className={'glyphicon glyphicon-ok'}/>
                </button>
                <button className="btn btn-default btn-sm" onClick={() => applyStopSend(order.id)}>
                  <i className="glyphicon glyphicon-remove"/>
                </button></div>}
              </td>
              <td className={styles.buttonCol}>
                {!rejectOrderBtn && <div>
                  <button className="btn btn-success btn-sm"
                          onClick={() => rejectOrder(order.id)}>
                    <i className={'fa fa-cog fa-spin'}/> OK
                  </button>
                  <button className="btn btn-default btn-sm" onClick={() => applyStopReject(order.id)}>
                    <i className="fa fa-ban"/> Cancel
                  </button></div>}
                {rejectOrderBtn &&
                <button className="btn btn-danger btn-sm" onClick={handleApplyReject(order.id)}>
                  <i className="fa fa-pencil"/> Cancel
                </button>}
              </td>
            </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}

