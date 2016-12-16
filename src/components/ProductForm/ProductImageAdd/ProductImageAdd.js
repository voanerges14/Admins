import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as productActions from 'redux/modules/products';

@connect(
  state => ({
    onShowImageUploader: state.products.onShowImageUploader,
    onAddProductImage: state.products.onAddProductImage
    // onEditProduct: state.products.onEditProduct
  }),
  dispatch => bindActionCreators(productActions, dispatch)
)
@reduxForm({
  form: 'ImageAdd',
  fields: ['img']
})
export default class ProductImageAdd extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    // addStopImage: PropTypes.func.isRequired,
    // ProductBtn: PropTypes.func.isRequired,
    addProductImage: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,

    onAddProductImage: PropTypes.object.isRequired,
    onEditProduct: PropTypes.object.isRequired,
    addStopImage: PropTypes.func.isRequired
  };

  render() {
    const { addStopImage, fields: {img}, onEditProduct, addProductImage, values} = this.props;
    const styles = require('./ProductImageAdd.scss');

    return (
      <div className={styles.Form}>
        <input type="text" {...img}/>
        <span>
          <button className="btn btn-success btn-sm"
                  onClick={() => addProductImage({ _id: onEditProduct._id, img: values.url}) }>
            <i className={'glyphicon glyphicon-ok'}/>
          </button>
          <button className="btn btn-default btn-sm" onClick={() => addStopImage() }>
            <i className="glyphicon glyphicon-remove"/>
          </button>
        </span>
      </div>
    );
  }
}
