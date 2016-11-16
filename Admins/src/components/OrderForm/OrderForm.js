import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as orderActions from 'redux/modules/orders';

@connect(
  state => ({
    saveError: state.orders.saveError
  }),
  dispatch => bindActionCreators(orderActions, dispatch)
)
@reduxForm({
  form: 'order',
  fields: ['id', 'userName', 'productId', 'product', 'status'],
})
export default class OrderForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    applyStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    rejectOrder: PropTypes.func.isRequired,
    sendToDeliveryOrder: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired
  };

  render() {
    const { applyStop, fields: {id, userName, productId, product}, formKey, handleSubmit,
      rejectOrder, sendToDeliveryOrder, submitting, values } = this.props;
    const styles = require('containers/Orders/Orders.scss');
    return (
      <tr className={submitting ? styles.saving : ''}>
        <td className={styles.idCol}>{id.value}</td>
        <td className={styles.sprocketsCol}>{userName.value}</td>
        <td className={styles.sprocketsCol} id={productId}>{product.value}</td>

        <td className={styles.buttonCol}>
          <button className="btn btn-default"
                  onClick={() => applyStop(formKey)}
                  disabled={submitting}>
            <i className="fa fa-ban"/> Cancel
          </button>
          <button className="btn btn-success"
                  onClick={handleSubmit(() => rejectOrder(values)
                    .then(result => {
                      if (result && typeof result.error === 'object') {
                        return Promise.reject(result.error);
                      }
                    })
                  )}
                  disabled={submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
          </button>
        </td>

        <td className={styles.buttonCol}>
          <button className="btn btn-default"
                  onClick={() => applyStop(formKey)}
                  disabled={submitting}>
            <i className="fa fa-ban"/> Cancel
          </button>
          <button className="btn btn-success"
                  onClick={handleSubmit(() => sendToDeliveryOrder(values)
                    .then(result => {
                      if (result && typeof result.error === 'object') {
                        return Promise.reject(result.error);
                      }
                    })
                  )}
                  disabled={submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
          </button>
        </td>
      </tr>
    );
  }
}

