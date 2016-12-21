import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as productActions from 'redux/modules/products';
import {ProductImageAdd, ProductDescription, ProductProperty} from 'components';
// , ProductDescriptionEdit, ProductPropertyEdit} from 'components';
@connect(
  state => ({
    onEditProduct: state.products.onEditProduct,
    onShowImagePopUp: state.products.onShowImagePopUp,
    onAddProductImage: state.products.onAddProductImage,
    onDescription: state.products.onDescription,
    onProperty: state.products.onProperty


  }),
  dispatch => bindActionCreators(productActions, dispatch)
)
@reduxForm({
  form: 'productEdit',
  fields: ['name', 'price', 'inStock', 'description']
})
export default class ProductEdit extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStopProduct: PropTypes.func.isRequired,
    editProduct: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onEditProduct: PropTypes.object.isRequired,
    toggleImg: PropTypes.func.isRequired,
    onShowImagePopUp: PropTypes.bool.isRequired,
    images: PropTypes.array.isRequired,
    properties: PropTypes.array.isRequired,
    toggleDescription: PropTypes.func.isRequired,
    onDescription: PropTypes.bool.isRequired,
    toggleProperty: PropTypes.func.isRequired,
    onProperty: PropTypes.bool.isRequired

  };

  render() {
    const {
        fields: {name, price, inStock, description}, editProduct, toggleImg, values, images, properties,
        onShowImagePopUp, onEditProduct, editStopProduct, toggleDescription, onDescription, onProperty, toggleProperty
    } = this.props;

    const styles = require('./ProductEditForm.scss');
    // debugger;
    return (
        <tr>
          <td colSpan="7">
            <div className={styles.lineOne}>
              <label className={styles.name}> name
                <input type="text" className="form-control" {...name}/>
              </label>

              <label className={styles.price}> price
                <input type="text" className="form-control" {...price}/>
              </label>

              <label className={styles.number}> number
                <input type="text" className="form-control" {...inStock}/>
              </label>

              {
                images && images.length ?
                  <label className={styles.logo}> image
                     <ProductImageAdd images={images}/>
                    <p>
                      <img src={decodeURIComponent(images[0])}
                           onClick={() => toggleImg(onShowImagePopUp)}/>
                    </p>
                  </label>
                :
                  <div onClick={() => toggleImg(onShowImagePopUp)}>no image</div>
              }
            </div>
            <div className={styles.lineTwo}>
              <span className={styles.description}>
                <label> description </label>
                <ProductDescription initialValues={{'description': description.initialValue}}/>
                <div onClick={() => toggleDescription(onDescription)}>
                  {
                    description.initialValue.length > 100 ?
                      (description.initialValue.substring(0, 100) + '...')
                    :
                      description.initialValue
                  }
                </div>
              </span>
              <span className={styles.property}>
                <ProductProperty properties={properties}/>
                <label> property </label>
                <div onClick={() => toggleProperty(onProperty)}>
                  {
                    properties && properties.length ?
                      <div>
                        <p>{properties[0].name + ': ' + properties[0].value}</p>
                        {properties.length >= 2 &&
                        <p>{properties[1].name + ': ' + properties[1].value}</p>}
                      </div>
                    :
                      <div>no properties (((</div>
                  }
                </div>
              </span>
              <span className={styles.button}>
                <button className="btn btn-success btn-lg"
                        onClick={() => editProduct({
                          'name': values.name,
                          'price': values.price,
                          'inStock': values.inStock,
                          'description': description.value
                        }, onEditProduct._id)}>
                  <i className={'glyphicon glyphicon-ok'}/>
                </button>

                <button className="btn btn-default btn-lg" onClick={() => editStopProduct()}>
                  <i className="glyphicon glyphicon-remove"/>
                </button>
              </span>
            </div>
          </td>
        </tr>
    );
  }
}

