import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as productActions from 'redux/modules/products';
import {SkyLightStateless} from 'react-skylight';
// import {ProductImageAdd} from '../../ProductForm/ProductImageAdd/ProductImageAdd';

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
  fields: ['name', 'numbers', 'price', 'image', 'date', 'description' ]
})
export default class ProductEdit extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    editProduct: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onEditProduct: PropTypes.object.isRequired,
    showPopUp: PropTypes.func.isRequired,
    onShowImagePopUp: PropTypes.object.isRequired,
    addStartImage: PropTypes.func.isRequired,
    onAddProductImage: PropTypes.object.isRequired
  };

  render() {
    const {editStop, fields: {name, numbers, image}, editProduct, values, onEditProduct
      , showPopUp, onShowImagePopUp, addStartImage} = this.props;
    const styles = require('./ProductEdit.scss');
    return (
      <tr>
        <td className={styles.colorCol}>
          <input type="text" className="form-control" {...name}/>
        </td>
        <td className={styles.sprocketsCol}>
          <input type="text" className="form-control" {...numbers}/>
        </td>
        <td className={styles.colorCol}>
          <input type="text" className="form-control" {...name}/>
        </td>
        <td className={styles.logo}>
          <p>
            <img onClick={() => {
              showPopUp(onShowImagePopUp);
            }} src={'https://facebook.github.io/react/img/logo_og.png'} {...image}/>
          </p>
          <div>
            <SkyLightStateless
              isVisible={onShowImagePopUp}
              onCloseClicked={() => {
                showPopUp(onShowImagePopUp);
              }}
            >
              <button className="btn btn-primary" >
                <i className="fa fa-plus" onClick={addStartImage(onEditProduct._id)}/> ADD
              </button>
               {/* {onAddProductImage.isActive && <ProductImageAdd/>}*/}
            </SkyLightStateless>
          </div>
          {/* <input type="text" className="form-control" {...image}/>*/}
        </td>
        <td className={styles.colorCol}>
          {name}
        </td>
        <td className={styles.sprocketsCol}>
          <input type="text" className="form-control" {...numbers}/>
        </td>
        <td className={styles.buttonColl}>
          <button className="btn btn-success"
                  onClick={() => editProduct(values, onEditProduct.id)}>
            <i className="glyphicon glyphicon-ok"/>
          </button>

          <button className="btn btn-default" onClick={() => editStop()}>
            <i className="glyphicon glyphicon-remove"/>
          </button>

        </td>
      </tr>
    );
  }
}

