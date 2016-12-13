import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as ordersActions from 'redux/modules/orders';
import {isLoaded, load as loadOrders} from 'redux/modules/orders';
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
  {...ordersActions})
export default class Orders extends Component {
  static propTypes = {
    orders: PropTypes.array,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired,
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
    const { orders, toDeliveryBtn, rejectOrderBtn, loading, load, rejectOrder, toDeliveryOrder,
            startSend, stopSend, startReject, stopReject } = this.props;
    const sendBtn = (formKey) => {
      return (typeof toDeliveryBtn[formKey] === 'undefined') ? false : toDeliveryBtn[formKey];
    };
    const rejectBtn = (formKey) => {
      return (typeof rejectOrderBtn[formKey] === 'undefined') ? false : rejectOrderBtn[formKey];
    };
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
                  </div>)}
              </td>
              <td className={styles.sendCol}>
                {!sendBtn(order.id) &&
                < button className="btn btn-primary btn-sm" onClick={() => startSend(order.id)}>
                  <i className="fa fa-pencil"/> Send
                </button>}

                {sendBtn(order.id) && <div>
                <button className="btn btn-success btn-sm" onClick={() => toDeliveryOrder(order.id)}>
                  <i className={'glyphicon glyphicon-ok'}/>
                </button>
                <button className="btn btn-default btn-sm" onClick={() => stopSend(order.id)}>
                  <i className="glyphicon glyphicon-remove"/>
                </button></div>}
              </td>
              <td className={styles.rejectCol}>
                {!rejectBtn(order.id) &&
                <button className="btn btn-danger btn-sm" onClick={() => startReject(order.id)}>
                  <i className="fa fa-pencil"/> Cancel
                </button>}

                {rejectBtn(order.id) && <div>
                  <button className="btn btn-success btn-sm" onClick={() => rejectOrder(order.id)}>
                    <i className={'glyphicon glyphicon-ok'}/>
                  </button>
                  <button className="btn btn-default btn-sm" onClick={() => stopReject(order.id)}>
                    <i className="glyphicon glyphicon-remove"/>
                  </button></div>}
              </td>
            </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}

