import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as productActions from 'redux/modules/products';
import productsValidation from './productsValidation';

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
  fields: ['name', 'inStock', 'price', 'images', 'description' ],
  validate: productsValidation
})
export default class ProductEdit extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    onAddProduct: PropTypes.object.isRequired,
    addStopProduct: PropTypes.func.isRequired,
    addProduct: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired
  };

  updateProperty(value, name) {
    const property = this.props.onAddProduct.properties;
    for (let index = 0; index < property.length; ++index) {
      if (property[index].name === name) {
        this.props.onAddProduct.properties[index].value = value;
      }
    }
  }

  render() {
    const {fields: {name, inStock, price, images, description}, values, onAddProduct,
      addStopProduct, addProduct, submitting, invalid, pristine} = this.props;

    const styles = require('./ProductEditForm.scss');

    return (
    <div>
      <label className={styles.name}> name
        <input type="text" className="form-control" {...name}/>
        {name.error && name.touched ? <div className="text-danger">{name.error}</div> :
            <div>{'\xa0'}</div>}
      </label>
      <label className={styles.price}> price
        <input type="text" className="form-control" {...price}/>
        {price.error && price.touched ? <div className="text-danger">{price.error}</div> :
            <div>{'\xa0'}</div>}
      </label>
      <label className={styles.number}> number
        <input type="text" className="form-control" {...inStock}/>
        {inStock.error && inStock.touched ? <div className="text-danger">{inStock.error}</div> :
            <div>{'\xa0'}</div>}
      </label>

      <label className={styles.image}> image
        <input type="text" className="form-control" {...images}/>
        {images.error && images.touched ? <div className="text-danger">{images.error}</div> :
            <div>{'\xa0'}</div>}
      </label>

      <label className={styles.description}> description
        <input type="text" className="form-control" {...description}/>
      </label>

      {
        onAddProduct.properties.map((property) =>
        <div>
          <input
              type="text"
              onChange={event => this.updateProperty(event.target.value, property.name).bind(this)}
              placeholder={property.name} />
        </div>
        )
      }
      <label>
      <button className="btn btn-success btn-sm"
              onClick={() => addProduct({
                'name': values.name,
                'price': values.price,
                'inStock': values.inStock,
                'images': images.value,
                'description': description.value,
                'properties': onAddProduct.properties
              }, onAddProduct.categoryId)}
              disabled={pristine || invalid || submitting}>
      <i className={'glyphicon glyphicon-ok'}/>
      </button>

      <button className="btn btn-default btn-sm" onClick={() => addStopProduct()}>
        <i className="glyphicon glyphicon-remove"/>
      </button>
        <div>{'\xa0'}</div>
      </label>

    </div>
    );
  }
}
