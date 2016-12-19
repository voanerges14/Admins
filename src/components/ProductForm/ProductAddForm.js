import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm, Field} from 'redux-form';
import * as productActions from 'redux/modules/products';

@connect(
  state => ({
    onAddProduct: state.products.onAddProduct,
    onShowImagePopUp: state.products.onShowImagePopUp,
    onAddProductImage: state.products.onAddProductImage
  }),
  dispatch => bindActionCreators(productActions, dispatch)
)
@reduxForm({
  form: 'productEdit',
  fields: ['name', 'inStock', 'price', 'images', 'description' ]
})
export default class ProductEdit extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    onAddProduct: PropTypes.object.isRequired,
    addStopProduct: PropTypes.func.isRequired,
    addProduct: PropTypes.func.isRequired
  };

  render() {
    debugger;
    // const {fields: {name, inStock, price, images, description}, values, onAddProduct,
    //   addStopProduct, addProduct} = this.props;

    // const styles = require('./ProductEditForm.scss');

    return (


        <Field component={React.DOM.input} type="text"/>


    );
  }
}

