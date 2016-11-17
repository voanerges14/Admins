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
  fields: ['id', 'userName', 'productId', 'product'],
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
    fields: PropTypes.object.isRequired,
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
      rejectOrder, toDeliveryOrder, fields: {id, userName, productId, product}} = this.props;
    const sendBtn = (typeof toDeliveryBtn[formKey] === 'undefined') ? false : toDeliveryBtn[formKey];
    const rejectBtn = (typeof rejectOrderBtn[formKey] === 'undefined') ? false : rejectOrderBtn[formKey];
    const styles = require('containers/Orders/Orders.scss');
    return (
      <tr className={styles.saving}>
        <td className={styles.idCol}>{id.value}</td>
        <td className={styles.sprocketsCol}>{userName.value}</td>
        <td className={styles.sprocketsCol} id={productId}>{product.value}</td>
        <td className={styles.buttonCol}>
         {sendBtn && <div>
            <button className="btn btn-default" onClick={() => applyStopSend(formKey)}>
              <i className="fa fa-ban"/> Cancel
            </button>
            <button className="btn btn-success"
                    onClick={handleSubmit(() => toDeliveryOrder(formKey)
                      .then(result => {
                        if (result && typeof result.error === 'object') {
                          return Promise.reject(result.error);
                        }
                      })
                    )}>
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

