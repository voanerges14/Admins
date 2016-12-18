import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as productActions from 'redux/modules/products';
import {ProductImageAdd} from 'components';

@connect(
  state => ({
    onEditProduct: state.products.onEditProduct,
    onShowImagePopUp: state.products.onShowImagePopUp,
    onAddProductImage: state.products.onAddProductImage
  }),
  dispatch => bindActionCreators(productActions, dispatch)
)
@reduxForm({
  form: 'productEdit',
  fields: ['name', 'price', 'inStock', 'images', 'date', 'description', 'properties']
})
export default class ProductEdit extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStopProduct: PropTypes.func.isRequired,
    editProduct: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onEditProduct: PropTypes.object.isRequired,
    toggleImg: PropTypes.func.isRequired,
    onShowImagePopUp: PropTypes.bool.isRequired
  };

  render() {
    const {
      fields: {name, price, inStock, images, description, properties}, editStopProduct,
      editProduct, values, onEditProduct, toggleImg, onShowImagePopUp
    } = this.props;

    const styles = require('./ProductEditForm.scss');
    debugger;
    return (
      <tr>
        <td colSpan="7">
          <label className={styles.name}> name
            <input type="text" className="form-control" {...name}/>
          </label>

          <label className={styles.price}> price
            <input type="text" className="form-control" {...price}/>
          </label>

          <label className={styles.number}> number
            <input type="text" className="form-control" {...inStock}/>
          </label>

          {images.defaultValue && images.defaultValue.length &&
          <label className={styles.logo}> image
            {onShowImagePopUp && <ProductImageAdd images={images.defaultValue}/>}
            <p>
              <img src={decodeURIComponent(images.defaultValue[0])} onClick={() => toggleImg(onShowImagePopUp)}/>
            </p>
          </label>
          }
          <label className={styles.description}> description
            <input type="text" className="form-control" {...description}/>
          </label>

          <table className={styles.description + ' table table-striped'}>
            <thead>
            <tr>
              <th className={styles.propertyName}>Name</th>
              <th className={styles.propertyValue}>Value</th>
            </tr>
            </thead>
            <tbody>
            {
              properties.defaultValue.map((property) =>
                <tr key={property.name}>
                  <td className={styles.propertyName}>
                    {property.name}
                  </td>
                  <td className={styles.userCol}>
                    {/* {properties[index]}*/}
                    {property.value}
                    <input type="text" className="form-control"
                           defaultValue={property.value} {...property.value}/>
                  </td>
                </tr>
              )
            }
            </tbody>
          </table>

          <button className="btn btn-success btn-sm" onClick={() => editProduct(values, onEditProduct.id)}>
            <i className={'glyphicon glyphicon-ok'}/>
          </button>

          <button className="btn btn-default btn-sm" onClick={() => editStopProduct()}>
            <i className="glyphicon glyphicon-remove"/>
          </button>
        </td>
      </tr>
    );
  }
}

