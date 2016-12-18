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
  form: 'ImageDelete',
})
export default class ProductImageDelete extends Component {
  static propTypes = {
    onEditProduct: PropTypes.object.isRequired,
    onShowImagePopUp: PropTypes.bool.isRequired,
    toggleImg: PropTypes.func.isRequired,
    addImg: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
    deleteImg: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired
  };

  render() {
    const {onShowImagePopUp, toggleImg, onEditProduct, deleteImg, image} = this.props;
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
      <div>
        <SkyLightStateless
          dialogStyles={stylesS.dialogStyles}
          closeButtonStyle={stylesS.closeButtonStyle}
          isVisible={onShowImagePopUp}
          onCloseClicked={() => {
            toggleImg(onShowImagePopUp);
          }}
        >
            <button className={styles.comBtn + 'btn btn-success btn-sm'}
                    onClick={() => deleteImg(onEditProduct._id, image)}>
              <i className={'glyphicon glyphicon-ok'}/>
            </button>
            <button className={styles.comBtn + 'btn btn-success btn-sm'}>
              <i className={'glyphicon glyphicon-ok'}/>
            </button>
        </SkyLightStateless>
      </div>
    );
  }
}
