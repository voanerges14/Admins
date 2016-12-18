import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as productActions from 'redux/modules/products';
import {SkyLightStateless} from 'react-skylight';

@connect(
  state => ({
    onShowImagePopUp: state.products.onShowImagePopUp,
    onAddProductImage: state.products.onAddProductImage,
    onEditProduct: state.products.onEditProduct
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
    // // addStopImage: PropTypes.func.isRequired,
    // // ProductBtn: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    //
    // addStopImage: PropTypes.func.isRequired,
    onEditProduct: PropTypes.object.isRequired,
    onAddProductImage: PropTypes.bool.isRequired,
    onShowImagePopUp: PropTypes.bool.isRequired,
    toggleImg: PropTypes.func.isRequired,
    addImg: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired
  };

  render() {
    const {fields: {img}, values, onShowImagePopUp, addImg, toggleImg, onEditProduct, images} = this.props;
    const styles = require('./ProductImageAdd.scss');
    const stylesS = {
      dialogStyles: {
        width: '50%',
        height: '730px',
        // position: 'fixed',
        top: '33%',
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

    const handleAddImg = (image, id) => {
      return () => {addImg(image, id);};
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
          <div>
            <input type="text" className={styles.comInp + ' form-control'} {...img}/>
            <button className={styles.comBtn + 'btn btn-success btn-sm'}
                    onClick={handleAddImg(values.img, onEditProduct._id)}>
              <i className={'glyphicon glyphicon-ok'}/>
            </button>
          </div>
          {images && images.length &&
          <div className={styles.component3}>
            {images.map((image) =>
              <p className={styles.component}>
                <img src={decodeURIComponent(image)}/>
              </p>
            )}
          </div>}
        </SkyLightStateless>
      </div>

    );
  }
}
