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
    toggleDescription: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    toggleProperty: PropTypes.func.isRequired,
    properties: PropTypes.object.isRequired
  };

  render() {
    const {fields: {property}, values, onProperty, onEditProduct, toggleProperty, properties} = this.props;
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
            isVisible={onProperty.isActive}
            onCloseClicked={() => {
              toggleProperty(onProperty.isActive);
            }}
          >
          {description &&
          <div>
            <div>
              {fields.map((member, index) =>
                <li key={index}>
                  <button
                    type="button"
                    title="Remove Member"
                    onClick={() => fields.remove(index)}/>
                  <h4>Member #{index + 1}</h4>
                  <Field
                    name={`${member}.firstName`}
                    type="text"
                    component={renderField}
                    placeholder="First Name"/>
                  <Field
                    name={`${member}.lastName`}
                    type="text"
                    component={renderField}
                    placeholder="Last Name"/>
                  <FieldArray name={`${member}.hobbies`} component={renderHobbies}/>
                </li>
              )}
            </div>
            </div>}
        </SkyLightStateless>
      </div>
    );
  }
}
