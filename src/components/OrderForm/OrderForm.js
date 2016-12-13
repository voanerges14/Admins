import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as orderActions from 'redux/modules/orders';

@connect(
  state => ({
    toDeliveryBtn: state.orders.toDeliveryBtn,
    rejectOrderBtn: state.orders.rejectOrderBtn
  }),
  dispatch => bindActionCreators(orderActions, dispatch)
)
@reduxForm({
  form: 'order',
  fields: ['id', 'user', 'products']
})
export default class OrderForm extends Component {
  static propTypes = {
    toDeliveryBtn: PropTypes.object.isRequired,
    rejectOrderBtn: PropTypes.object.isRequired,
    applyStartSend: PropTypes.func.isRequired,
    applyStopSend: PropTypes.func.isRequired,
    applyStopReject: PropTypes.func.isRequired,
    applyStartReject: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    rejectOrder: PropTypes.func.isRequired,
    toDeliveryOrder: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    formKey: PropTypes.string.isRequired,
  };

  render() {
    const handleApplyReject = (id) => {
      const {applyStartReject} = this.props; // eslint-disable-line no-shadow
      return () => applyStartReject(String(id));
    };
    const handleApplySend = (id) => {
      const {applyStartSend} = this.props; // eslint-disable-line no-shadow
      return () => applyStartSend(String(id));
    };
    const { toDeliveryBtn, rejectOrderBtn, applyStopSend, applyStopReject, formKey, handleSubmit,
      rejectOrder, toDeliveryOrder, user, products} = this.props;
    const sendBtn = (typeof toDeliveryBtn[formKey] === 'undefined') ? false : toDeliveryBtn[formKey];
    const rejectBtn = (typeof rejectOrderBtn[formKey] === 'undefined') ? false : rejectOrderBtn[formKey];
    const styles = require('containers/Orders/Orders.scss');
    return (
      <tr>
        <td className={styles.idOrdersCol}>
          { formKey }
        </td>
        <td className={styles.userCol}>
          <p>{ user.firstName + ' ' + user.lastName }</p>
          <p>{ user.email }</p>
          <p>{ user.phoneNumber}</p>
        </td>
        <td className={styles.productsCol}>
          {products.map((elem, index) =>
            <div key={ elem.product._id }>
              <span className={styles.productNumber} id={ elem.product._id }>{ index + 1 }. </span>
              <span className={styles.productName} id={ index }>{ elem.product.name } --- {elem.quantity}</span>
            </div>)}
        </td>
        <td className={styles.sendCol}>
         {sendBtn && <div>
            <button className="btn btn-success btn-sm" onClick={handleSubmit(() => toDeliveryOrder(formKey))}>
             <i className={'glyphicon glyphicon-ok'}/>
            </button>
            <button className="btn btn-default btn-sm" onClick={() => applyStopSend(formKey)}>
              <i className="glyphicon glyphicon-remove"/>
            </button></div>}
         {!sendBtn &&
             <button className="btn btn-primary btn-sm" onClick={handleApplySend(formKey)}>
               <i className="fa fa-pencil"/> Send
             </button>}
        </td>
        <td className={styles.rejectCol}>
         {rejectBtn && <div>
            <button className="btn btn-success btn-sm" onClick={handleSubmit(() => rejectOrder(formKey))}>
              <i className={'fa fa-cog fa-spin'}/> OK
            </button>
            <button className="btn btn-default btn-sm" onClick={() => applyStopReject(formKey)}>
              <i className="fa fa-ban"/> Cancel
            </button></div>}
         {!rejectBtn &&
             <button className="btn btn-danger btn-sm" onClick={handleApplyReject(formKey)}>
               <i className="fa fa-pencil"/> Cancel
             </button>}
        </td>
      </tr>
    );
  }
}

