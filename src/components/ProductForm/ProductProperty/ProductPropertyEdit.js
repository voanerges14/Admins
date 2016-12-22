import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm, Field} from 'redux-form';
import * as productActions from 'redux/modules/products';

@connect(
    state => ({
      onEditProduct: state.products.onEditProduct,
      onShowImagePopUp: state.products.onShowImagePopUp,
      onAddProductImage: state.products.onAddProductImage,
      onShowPropertyPopUp: state.products.onShowPropertyPopUp,
      onShowDescriptionPopUp: state.products.onShowDescriptionPopUp
    }),
    dispatch => bindActionCreators(productActions, dispatch)
)
@reduxForm({
  form: 'productEdit',
  fields: ['name', 'price', 'inStock', 'date', 'description']
})
export default class ProductEdit extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStopProduct: PropTypes.func.isRequired,
    editProduct: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onEditProduct: PropTypes.object.isRequired,
    toggleImg: PropTypes.func.isRequired,
    onShowPropertyPopUp: PropTypes.bool.isRequired,
    onShowDescriptionPopUp: PropTypes.bool.isRequired,
    onShowImagePopUp: PropTypes.bool.isRequired,
    images: PropTypes.array.isRequired,
    properties: PropTypes.array.isRequired
  };

  render() {
    const {fields: {properties}} = this.props;

    const styles = require('./ProductEditForm.scss');
    debugger;
    return (
        <table className={styles.description + ' table table-striped'}>
          <thead>
          <tr>
            <th className={styles.propertyName}>Name</th>
            <th className={styles.propertyValue}>Value</th>
          </tr>
          </thead>
          <tbody>
          {
            properties.defaultValue.map((property) =>
                <tr key={property.name}>
                  <td className={styles.propertyName}>
                    {property.name}
                  </td>
                  <td className={styles.userCol}>
                    {/* {properties[index]}*/}
                    {property.value}
                    <Field name={property.name}
                           component="input"
                           type="text"
                           placeholder="Last Name"
                           value={property.name}
                    />
                  </td>
                </tr>
            )
          }
          </tbody>
        </table>
    );
  }
}
/**
 * Created by hi on 18.12.16.
 */
