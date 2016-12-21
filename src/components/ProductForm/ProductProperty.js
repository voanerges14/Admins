import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as productActions from 'redux/modules/products';
import {SkyLightStateless} from 'react-skylight';
@connect(
  state => ({
    onEditProduct: state.products.onEditProduct,
    loadProducts: state.products.loadProducts,
    onProperty: state.products.onProperty

  }),
  dispatch => bindActionCreators(productActions, dispatch)
)
@reduxForm({
  form: 'Property',
  fields: ['property']
})
export default class ProductProperty extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    onEditProduct: PropTypes.object.isRequired,

    onProperty: PropTypes.object.isRequired,
    editDescription: PropTypes.func.isRequired,
    toggleProperty: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    properties: PropTypes.array.isRequired
  };

  render() {
    const {onProperty, toggleProperty, properties} = this.props;
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

    debugger;
    return (
      <div>
        <SkyLightStateless
            dialogStyles={stylesS.dialogStyles}
            closeButtonStyle={stylesS.closeButtonStyle}
            isVisible={onProperty}
            onCloseClicked={() => {
              toggleProperty(onProperty);
            }}
          >
          {properties &&
          <div>
            <div>
              {/* properties.map((property) => {*/}
              {/* <CategoryEditProp key={property.name} initialValues={property}/>*/}
            {/* });*/}
            {/* properties.map((property) =>{*/}
              {/* <div>*/}
                {/* <input*/}
                  {/* type="text"*/}
                  {/* onChange={event => this.updateProperty(event.target.value, property.name)}*/}
                  {/* placeholder={property.name} />*/}
              {/* </div>*/}
            {/* });*/}
            </div>
            </div>}
        </SkyLightStateless>
      </div>
    );
  }
}
