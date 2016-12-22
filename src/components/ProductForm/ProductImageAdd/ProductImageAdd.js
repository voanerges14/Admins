import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as productActions from 'redux/modules/products';
import {SkyLightStateless} from 'react-skylight';
import urlValidation from './../productValidation';
@connect(
  state => ({
    onShowImagePopUp: state.products.onShowImagePopUp,
    onAddProductImage: state.products.onAddProductImage,
    onEditProduct: state.products.onEditProduct,
    onDeleteImage: state.products.onDeleteImage,
    loadProducts: state.products.loadProducts

  }),
  dispatch => bindActionCreators(productActions, dispatch)
)
@reduxForm({
  form: 'ImageAdd',
  fields: ['img'],
  validate: urlValidation
})
export default class ProductImageAdd extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    onEditProduct: PropTypes.object.isRequired,
    onAddProductImage: PropTypes.bool.isRequired,
    onShowImagePopUp: PropTypes.bool.isRequired,
    toggleImg: PropTypes.func.isRequired,
    addImg: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
    deleteImg: PropTypes.func.isRequired,
    onDeleteImage: PropTypes.object.isRequired,
    deleteStartImg: PropTypes.func.isRequired,
    deleteImgStop: PropTypes.func.isRequired,
    loadProducts: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired

  };

  render() {
    const {fields: {img}, values, onShowImagePopUp, addImg, toggleImg, onEditProduct,
      images, onDeleteImage, deleteStartImg, deleteImg, deleteImgStop, pristine, submitting, invalid} = this.props;
    const styles = require('./ProductImageAdd.scss');
    const stylesS = {
      dialogStyles: {
        width: '50%',
        height: '89%',
        // position: 'fixed',
        top: '37%',
        left: '50%',
        // marginTop: '-5%',
        // marginLeft: '-25%',
        backgroundColor: '#fff',
        borderRadius: '8px',
        zIndex: 100,
        padding: '15px',
        boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)'
      },
      closeButtonStyle: {
        cursor: 'pointer',
        position: 'absolute',
        fontSize: '2.2em',
        right: '8px',
        top: '0'
      }
    };
    return (
      <div>
        <SkyLightStateless
          dialogStyles={stylesS.dialogStyles}
          closeButtonStyle={stylesS.closeButtonStyle}
          isVisible={onShowImagePopUp}
          onCloseClicked={() => {
            toggleImg(onShowImagePopUp);
          }}
        >
          {images && images.length &&
          onDeleteImage.isActive ?
            <div>
              <p className={styles.delImage}>
                <img src={decodeURIComponent(onDeleteImage.image)}/></p>
              <span>DELETE THIS PICTURE?
              <button className={styles.comBtn + 'btn btn-success btn-sm'}
                      onClick={() => {
                        deleteImg(onEditProduct._id, onDeleteImage.image);
                      }}>DELETE
                <i className={'glyphicon glyphicon-ok'}/>
              </button>
              <button className={styles.comBtn + 'btn btn-success btn-sm'}
                      onClick={() => deleteImgStop()}>CANCEL
                <i className={'glyphicon glyphicon-remove'}/>
              </button>
              </span>
            </div> :
            <div>
              <div>
                <input type="text" className={styles.comInp + ' form-control'} {...img}/>
                <button className={styles.comBtn + 'btn btn-success btn-sm'}
                        onClick={() => addImg(values.img, onEditProduct._id)}
                        disabled={pristine || invalid || submitting}>
                  <i className={'glyphicon glyphicon-ok'}/>
                </button>
                <div className={styles.comError}>{img.error && img.touched && <div className="text-danger">{img.error}</div>}</div>
              </div>
              <div className={styles.component3}>
                {images.map((image) =>
                  <button key={image} className={styles.logo} onDoubleClick={() => deleteStartImg(image)}>
                    <img src={decodeURIComponent(image)}/>
                  </button>
                )}
              </div>
            </div>}
        </SkyLightStateless>
      </div>
    );
  }
}
