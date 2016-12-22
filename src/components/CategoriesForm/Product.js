import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as productAction from 'redux/modules/products';
import {initializeWithKey} from 'redux-form';
import {ProductAdd, ProductEdit} from 'components';

@connect(
  state => ({
    products: state.products.data,
    onEditProduct: state.products.onEditProduct,
    onAddProduct: state.products.onAddProduct,
    onDeleteProduct: state.products.onDeleteProduct
  }),
  {initializeWithKey, ...productAction})

export default class Product extends Component {
  static propTypes = {
    products: PropTypes.array,
    onAddProduct: PropTypes.object.isRequired,
    onEditProduct: PropTypes.object.isRequired,
    onDeleteProduct: PropTypes.object.isRequired,
    _id: PropTypes.string.isRequired,
    addStartProduct: PropTypes.func.isRequired,
    editStartProduct: PropTypes.func.isRequired,
    deleteStartProduct: PropTypes.func.isRequired,
    deleteStopProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired
  };

  render() {
    const { onAddProduct, onEditProduct, onDeleteProduct,
        _id, products, addStartProduct, editStartProduct, deleteStartProduct, deleteStopProduct,
        deleteProduct
    } = this.props;

    const styles = require('./Product.scss');

    return (
      <div>
        {onAddProduct.isActive && <ProductAdd/>}
        {
          products && products.length ?
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className={styles.nameColProd}>Name</th>
                  <th className={styles.priceColProd}>Price</th>
                  <th className={styles.numberColProd}>Number</th>
                  <th className={styles.imageColProd}>Image</th>
                  <th className={styles.descriptionColProd}>Description</th>
                  <th className={styles.propertyColProd}>Property</th>
                  {
                    !onAddProduct.isActive &&
                    <th className={styles.nameColProd}>
                      <button className="btn btn-primary" onClick={() => addStartProduct(_id) }>
                        <i className="glyphicon glyphicon-plus"/>ADD
                      </button>
                    </th>
                  }
                </tr>
              </thead>
              <tbody>
              {
                products.map((product) => (onEditProduct.isActive && onEditProduct._id === product._id) ?
                  <ProductEdit
                      key={product._id}
                      images={product.images}
                      properties={product.properties}
                      initialValues={{
                        'name': product.name,
                        'price': product.price,
                        'inStock': product.inStock,
                        'description': product.description
                      }}
                  />
                :
                  <tr key={product._id}>
                    <td className={styles.nameColProd}>{product.name}</td>

                    <td className={styles.priceColProd}>{product.price}</td>

                    <td className={styles.numberColProd}>{product.inStock}</td>

                    <td className={styles.imageColProd}>
                      <div className={styles.logo}>
                        {product.images && product.images.length &&
                        <p>
                          <img src={decodeURIComponent(product.images[0])}/>
                        </p>
                        }
                      </div>
                    </td>

                    <td className={styles.descriptionColProd}>
                      {
                        product.description.length > 64 ?
                          product.description.substring(0, 64) + '...'
                        :
                          product.description
                      }
                    </td>

                    <td className={styles.propertyColProd}>
                      {
                        product.properties && product.properties.length ?
                          <div>
                            <p>{product.properties[0].name + ': ' + product.properties[0].value}</p>
                            {product.properties.length >= 2 &&
                              <p>{product.properties[1].name + ': ' + product.properties[1].value}</p>}
                          </div>
                        :
                          <div>no properties (((</div>
                      }
                    </td>
                    <td>
                      <button className={styles.btnColProd + ' btn btn-primary'}
                              onClick={() => editStartProduct(product._id)}>
                        <i className="fa fa-pencil"/>
                      </button>

                      {onDeleteProduct.isActive && onDeleteProduct._id === product._id ?
                        <span>
                          <button className="btn btn-success btn-sm"
                                  onClick={() => deleteProduct(product._id)}>
                            <i className={'glyphicon glyphicon-ok'}/>
                          </button>
                          <button className="btn btn-default btn-sm"
                                  onClick={() => deleteStopProduct()}>
                            <i className="glyphicon glyphicon-remove"/>
                          </button>
                        </span>
                      :
                        <button className="btn btn-primary"
                                onClick={() => deleteStartProduct(product._id)}>
                          <i className="fa fa-trash"/>
                        </button>
                      }
                    </td>
                  </tr>
                )
              }
              </tbody>
            </table>
          :
            <div>
              {
                !onAddProduct.isActive &&
                <button className="btn btn-primary" onClick={() => addStartProduct(_id) }>
                  <i className="glyphicon glyphicon-plus"/>ADD
                </button>
              }
              <div>We don't have any product in this category (((</div>
            </div>
        }
        </div>
    );
  }
}
