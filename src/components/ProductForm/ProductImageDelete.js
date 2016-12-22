import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as productActions from 'redux/modules/products';
import {SkyLightStateless} from 'react-skylight';

@connect(
  state => ({
    onShowImagePopUp: state.products.onShowImagePopUp,
    onEditProduct: state.products.onEditProduct,
    onDeleteImage: state.products.onDeleteImage
  }),
  dispatch => bindActionCreators(productActions, dispatch)
)
@reduxForm({
  form: 'ImageDelete',
})
export default class ProductImageDelete extends Component {
  static propTypes = {
    onEditProduct: PropTypes.object.isRequired,
    onShowImagePopUp: PropTypes.bool.isRequired,
    deleteImg: PropTypes.func.isRequired,
    onDeleteImage: PropTypes.object.isRequired,
    deleteImgStop: PropTypes.func.isRequired
  };

  render() {
    debugger;
    const {onEditProduct, deleteImg, onDeleteImage, deleteImgStop} = this.props;
    const styles = require('./ProductImageAdd/ProductImageAdd.scss');
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
    return (
        <SkyLightStateless
          dialogStyles={stylesS.dialogStyles}
          closeButtonStyle={stylesS.closeButtonStyle}
          isVisible={onDeleteImage.isActive}
          onCloseClicked={() => {
            deleteImgStop();
          }}
        >
          <div>
            <button className={styles.comBtn + 'btn btn-success btn-sm'}
                    onClick={() => deleteImg(onEditProduct._id, onDeleteImage.image)}>
              <i className={'glyphicon glyphicon-ok'}/>
            </button>
            <button className={styles.comBtn + 'btn btn-success btn-sm'}>
              onClick={() => deleteImgStop()}>
              <i className={'glyphicon glyphicon-ok'}/>
            </button>
          </div>
        </SkyLightStateless>
    );
  }
}
