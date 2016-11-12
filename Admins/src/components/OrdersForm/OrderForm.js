import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as orderActions from 'redux/modules/orders';
import {toDelivery, cancelOrders} from "../../redux/modules/orders";

// {id, userName,  productId, product,  status}
@connect(
  state => ({
    saveError: state.orders.saveError
  }),
  dispatch => bindActionCreators(orderActions, dispatch)
)
@reduxForm({
  form: 'order',
  fields: ['id', 'userName', 'productsId', 'product', 'status'],
})
export default class OrderForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    deleteOrder: PropTypes.func.isRequired,
    sendToDeliveryOrder: PropTypes.func.isRequired,

    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired
  };

  render() {
     // const { editStop, fields: { id, color, sprocketCount, owner}, formKey, handleSubmit, invalid,
     //   pristine, save, submitting, saveError: { [formKey]: saveError }, values } = this.props;
    const { fields: {id, userName,  productId, product/*,  status*/},
                deleteOrder, sendToDeliveryOrder, submitting} = this.props;
    const styles = require('containers/Orders/Orders.scss');
    return (
      <tr className={submitting ? styles.saving : ''}>
        let i = 0;
        <td className={styles.idCol} id={id.value}>{i++}</td> {/* number colum */}
        <td className={styles.colorCol}> {/* userName colum */}
          <select name="userName" className="form-control" {...color}>
            {userName.value}
    {/*{colors.map(valueColor => <option value={valueColor} key={valueColor}>{valueColor}</option>)}*/}
          </select>
          {/*{color.error && color.touched && <div className="text-danger">{color.error}</div>}*/}
        </td>
        <td className={styles.sprocketsCol}> {/* product colum */}
          <select name="product" id={productId.value} className="form-control" {...color}>
            {product.value}
         </select>
          {/*<input type="text" className="form-control" {...sprocketCount}/>*/}
          {/*{sprocketCount.error && sprocketCount.touched && <div className="text-danger">{sprocketCount.error}</div>}*/}
        </td>
        {/*<td className={styles.ownerCol}>*/}
          {/*<input type="text" className="form-control" {...owner}/>*/}
          {/*{owner.error && owner.touched && <div className="text-danger">{owner.error}</div>}*/}
        {/*</td>*/}
        <td className={styles.buttonCol}>
          <button className="btn btn-default" onClick={() => toDelivery(id.value)}>
                  {/*disabled={submitting}>*/}
            <i className="fa fa-ban"/> to delivery
          </button>

        </td>
        <td>
          <button className="btn btn-danger" onClick={() => cancelOrders(id.value)}>
          {/*.then(result => {*/}
          {/*if (result && typeof result.error === 'object') {*/}
          {/*return Promise.reject(result.error);*/}
          {/*}*/}
          {/*})*/)}
          {/*disabled={pristine || invalid || submitting}>*/}
          <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Delete
          </button>
          {/*{saveError && <div className="text-danger">{saveError}</div>}*/}
        </td>
      </tr>
    );
  }
}
