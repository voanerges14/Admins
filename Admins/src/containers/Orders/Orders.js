import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as ordersActions from 'redux/modules/orders';
import {isLoaded, load as loadOrders} from 'redux/modules/orders';
import {initializeWithKey} from 'redux-form';
import { OrdersForm } from 'components';
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
    editing: state.orders.editing,
    error: state.orders.error,
    loading: state.orders.loading,

    cancel: state.orders.deleteOrder,
    send: state.orders.sendToDeliveryOrder,
  }),
  {...ordersActions, initializeWithKey })
export default class Orders extends Component {
  static propTypes = {
    orders: PropTypes.array,
    userName: PropTypes.string,
    // productId,
    product: PropTypes.string,
    // status,

    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  };

  render() {
    // const handleEdit = (orders) => {
    //   const {editStart} = this.props; // eslint-disable-line no-shadow
    //   return () => editStart(String(orders.id));
    // };
    // const {orders, error, editing, loading, load} = this.props;
    const { orders, editing, load, loading, error } = this.props;
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
        {/* <p>*/}
          {/* If you hit refresh on your browser, the data loading will take place on the server before the page is returned.*/}
          {/* If you navigated here from another page, the data was fetched from the client after the route transition.*/}
          {/* This uses the decorator method <code>@asyncConnect</code> with the <code>deferred: true</code> flag. To block*/}
          {/* a route transition until some data is loaded, remove the <code>deffered: true</code> flag.*/}
          {/* To always render before loading data, even on the server, use <code>componentDidMount</code>.*/}
        {/* </p>*/}
        {/* <p>*/}
          {/* This widgets are stored in your session, so feel free to edit it and refresh.*/}
        {/* </p>*/}
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
            <th className={styles.ownerCol}>Apply</th>
            <th className={styles.buttonCol}>Cancel</th>
          </tr>
          </thead>
          <tbody>
          {
            orders.map((order) => editing[order.id] ?
              <OrdersForm formKey={String(order.id)} key={String(order.id)} initialValues={order}/> :
              <tr key={orders.id}>
                <td className={styles.idCol}>{order.id}</td>
                <td className={styles.colorCol}>{order.userName}</td>
                <td className={styles.sprocketsCol}>{order.product}</td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-success" /* onClick={handleEdit(order)} */>
                    <i className="fa fa-pencil"/> Apply
                  </button>
                </td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-danger" /* onClick={handleEdit(order)} */>
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

