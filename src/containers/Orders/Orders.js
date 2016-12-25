import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as ordersActions from 'redux/modules/orders';
import {isLoaded, load as initialLoad} from 'redux/modules/orders';
import { asyncConnect } from 'redux-async-connect';
import {AllOrdersForm, PaidOrdersForm} from 'components';
import * as productsActions from 'redux/modules/products';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(initialLoad());
    }
  }
}])

@connect(
  state => ({
    orders: state.orders.dataAll,
    toDeliveryBtn: state.orders.toDeliveryBtn,
    rejectOrderBtn: state.orders.rejectOrderBtn,
    error: state.orders.error,
    loading: state.orders.loading,
    showOrders: state.orders.showOrders
  }),
  {...ordersActions, productsActions})

export default class Orders extends Component {
  static propTypes = {
    orders: PropTypes.array,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired,
    showOrders: PropTypes.bool.isRequired,
    changeOrders: PropTypes.func.isRequired
  };

  render() {
    const {orders, loading, showOrders, changeOrders, load} = this.props;
    const styles = require('./Orders.scss');

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }

    return (
      <div className={styles.orders + ' container'}>
        <h1>
          {showOrders ? <div>All orders</div>
              : <div>Orders with status paid</div>}
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
            <i className={refreshClassName}/> {' '} Reload Orders
          </button>
          <button className={styles.changeBtn + ' btn btn-success'} onClick={() => changeOrders(showOrders)}>
            {showOrders ? <div>show paid orders</div> : <div>show all orders</div>}
          </button>
        </h1>
        <Helmet title="Orders"/>
        {(orders && orders.length) && (showOrders ? <AllOrdersForm/> : <PaidOrdersForm/>)}

        {!(orders && orders.length) && <div>We don't have any orders (((</div> }
      </div>
    );
  }
}

