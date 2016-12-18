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
    const {fields: {img}, values, onShowImagePopUp, toggleImg, addImg, onEditProduct, images} = this.props;
    const styles = require('./ProductImageAdd.scss');
    // const styles2 = require('./PopUp.scss');
    const myBigGreenDialog = {
      backgroundColor: '#00897B',
      color: '#ffffff',
      width: '70%',
      height: '100%',
      // marginTop: '-280px',
      marginLeft: '-35%',
    };

    debugger;
    return (
    <div>
      <SkyLightStateless
        dialogStyles={myBigGreenDialog}
        isVisible={onShowImagePopUp}
        onCloseClicked={() => {toggleImg(onShowImagePopUp);}}
        title=""
      >
        <div className={styles.Form}>
          <input type="text" {...img}/>
          <button className="btn btn-success btn-sm"
                  onClick={() => addImg(values.img, onEditProduct._id)}>
            <i className={'glyphicon glyphicon-ok'}/>
          </button>
        </div>
        {images && images.length &&
        <div>
          {images.map((image) =>
          <p className={styles.logo}>
            <img src={decodeURIComponent(image)}/>
          </p>
          )}
        </div>}
      </SkyLightStateless>
    </div>

    );
  }
}
