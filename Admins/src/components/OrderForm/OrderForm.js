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
    debugger;
    const styles = require('containers/Orders/Orders.scss');
    return (
      <tr className={styles.saving}>
        <td className={styles.idCol}>{formKey}</td>
        <td className={styles.sprocketsCol}>{user.firstName}</td>
        <td className={styles.sprocketsCol} id={products[0]._id}>
          {/* <tr key={products.id}>*/}
            <div>{products[0]._id}</div>
            <div>{products[0].name}</div>
          {/* </tr>*/}
        </td>
        <td className={styles.sprocketsCol} id={products[0].id}>{products.name}</td>
        <td className={styles.buttonCol}>
         {sendBtn && <div>
            <button className="btn btn-default" onClick={() => applyStopSend(formKey)}>
              <i className="fa fa-ban"/> Cancel
            </button>
            <button className="btn btn-success"
                    onClick={handleSubmit(() => toDeliveryOrder(formKey))}>
              <i className={'fa fa-cog fa-spin'}/> Save
            </button></div>}
         {!sendBtn &&
             <button className="btn btn-primary" onClick={handleApplySend(formKey)}>
               <i className="fa fa-pencil"/> Send
             </button>}
        </td>
        <td className={styles.buttonCol}>
         {rejectBtn && <div>
            <button className="btn btn-default" onClick={() => applyStopReject(formKey)}>
              <i className="fa fa-ban"/> Cancel
            </button>
            <button className="btn btn-success"
                    onClick={handleSubmit(() => rejectOrder(formKey)
                      .then(result => {
                        if (result && typeof result.error === 'object') {
                          return Promise.reject(result.error);
                        }
                      })
                    )}>
              <i className={'fa fa-cog fa-spin'}/> Save
            </button></div>}
         {!rejectBtn &&
             <button className="btn btn-danger" onClick={handleApplyReject(formKey)}>
               <i className="fa fa-pencil"/> Cancel
             </button>}
        </td>
      </tr>
    );
  }
}

