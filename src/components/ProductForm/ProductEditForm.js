import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as productActions from 'redux/modules/products';
import {ProductImageAdd} from 'components';
// , ProductDescriptionEdit, ProductPropertyEdit} from 'components';

@connect(
  state => ({
    onEditProduct: state.products.onEditProduct,
    onShowImagePopUp: state.products.onShowImagePopUp,
    onAddProductImage: state.products.onAddProductImage,
    onShowPropertyPopUp: state.products.onShowPropertyPopUp,
    onShowDescriptionPopUp: state.products.onShowDescriptionPopUp
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
    onShowPropertyPopUp: PropTypes.bool.isRequired,
    onShowDescriptionPopUp: PropTypes.bool.isRequired,
    onShowImagePopUp: PropTypes.bool.isRequired,
    images: PropTypes.array.isRequired,
    properties: PropTypes.array.isRequired
  };

  render() {
    const {
        fields: {name, price, inStock, description}, editProduct, toggleImg, values, images, properties,
        onShowImagePopUp, onEditProduct, editStopProduct // , onShowPropertyPopUp, onShowDescriptionPopUp
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

          {
            images && images.length ?
              <label className={styles.logo}> image
                 {onShowImagePopUp && <ProductImageAdd images={images}/>}
                <p>
                  <img src={decodeURIComponent(images[0])}
                       onClick={() => toggleImg(onShowImagePopUp)}/>
                </p>
              </label>
            :
              <div onClick={() => toggleImg(onShowImagePopUp)}>no image</div>
          }

          <label className={styles.description}> description
             {/* {onShowDescriptionPopUp && <ProductDescriptionEdit initialValues={description}/>}*/}
            <div>
              {
                description.initialValue.length > 100 ?
                  (description.initialValue.substring(0, 100) + '...')
                :
                  description.initialValue
              }
            </div>
          </label>

          {/* {onShowPropertyPopUp && <ProductPropertyEdit initialValues={properties}/>}*/}
          <label>
            {
              properties && properties.length ?
                <div>
                  <p>{properties[0].name + ': ' + properties[0].value}</p>
                  {properties.length >= 2 &&
                  <p>{properties[1].name + ': ' + properties[1].value}</p>}
                  {properties.length >= 3 &&
                  <p>{properties[2].name + ': ' + properties[2].value}</p>}
                </div>
              :
                <div>no properties (((</div>
            }
          </label>
          <button className="btn btn-success btn-sm"
                  onClick={() => editProduct({
                    'name': values.name,
                    'price': values.price,
                    'inStock': values.inStock,
                    description,
                    images,
                  }, onEditProduct.id)}>
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

