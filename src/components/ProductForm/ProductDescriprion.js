import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as productActions from 'redux/modules/products';
import {SkyLightStateless} from 'react-skylight';
// import {ProductImageDelete} from 'components';
@connect(
  state => ({
    onDescription: state.products.onDescription,
    onEditProduct: state.products.onEditProduct,
    onDeleteImage: state.products.onDeleteImage,
    loadProducts: state.products.loadProducts

  }),
  dispatch => bindActionCreators(productActions, dispatch)
)
@reduxForm({
  form: 'Description',
  fields: ['description']
})
export default class ProductDescription extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    onEditProduct: PropTypes.object.isRequired,
    onDescription: PropTypes.bool.isRequired,
    editDescription: PropTypes.func.isRequired,
    toggleDescription: PropTypes.func.isRequired
    // description: PropTypes.string.isRequired
  };

  render() {
    const {fields: {description}, values, onDescription, onEditProduct, toggleDescription, editDescription} = this.props;
    // const styles = require('./ProductImageAdd.scss');
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
            isVisible={onDescription}
            onCloseClicked={() => toggleDescription(onDescription)}
          >
          {description &&
          <div>
            <div>
              <textarea cols="40" rows="6" type="text" className={'form-control'} {...description}/>
              <button className={'btn btn-success btn-sm'}
                      onClick={() => editDescription(onEditProduct._id, values.description)}>
                <i className={'glyphicon glyphicon-ok'}/>
                SAVE
              </button>
            </div>
            </div>}
        </SkyLightStateless>
      </div>
    );
  }
}
