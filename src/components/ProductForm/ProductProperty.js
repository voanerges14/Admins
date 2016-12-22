import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as productActions from 'redux/modules/products';
import {SkyLightStateless} from 'react-skylight';
// import Scrollbar from 'react-smooth-scrollbar';
// const ScrollArea = require('react-scrollbar');
// const ScrollbarWrapper = require('react-scrollbars').ScrollbarWrapper;
import { Scrollbars } from 'react-custom-scrollbars';

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
    properties: PropTypes.array.isRequired,
    editProperty: PropTypes.func.isRequired
  };
  updateProperty(value, name) {
    const property = this.props.properties;
    for (let index = 0; index < property.length; ++index) {
      if (property[index].name === name) {
        this.props.properties[index].value = value;
      }
    }
  }

  render() {
    const {onProperty, toggleProperty, properties, editProperty, onEditProduct} = this.props;
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
    // const styles = require('./ProductProperty.scss');
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
          <Scrollbars style={{ width: '100%', height: '97%' }}>
            <div>
          <table className="table table-striped">
            <thead>

            </thead>
          <tbody>
          {properties && properties.map((property) =>
            <tr key={property.name}>
              <td>{property.name}</td>
              <td>
              <input
                className="form-control"
                type="text"
                defaultValue={property.value}
                onChange={event => this.updateProperty(event.target.value, property.name).bind(this)}
                 />
            </td>
            </tr>
          )}
          <button className="btn btn-success" onClick={() => {
            editProperty(onEditProduct._id, properties);
            toggleProperty(onProperty);
          }}>
            <i className="glyphicon glyphicon-ok"/>
            SAVE
          </button>
            </tbody>
          </table>
            </div>
          </Scrollbars>
        </SkyLightStateless>
      </div>
    );
  }
}
