import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as productAction from 'redux/modules/products';
import {initializeWithKey} from 'redux-form';
import {ProductAdd, ProductEdit} from 'components';
// import {isLoaded, load as loadProducts, categoryId} from 'redux/modules/products';
// import {asyncConnect} from 'redux-async-connect';
// @asyncConnect([{
//   deferred: true,
//   promise: ({store: {dispatch, getState}}) => {
//     if (!isLoaded(getState())) {
//       debugger;
//       return dispatch(loadProducts(categoryId));
//     }
//   }
// }])

@connect(
    state => ({
      products: state.products.data,
      onEditProduct: state.products.onEditProduct,
      onAddProduct: state.products.onAddProduct,
      onDeleteProduct: state.products.onDeleteProduct
    }),
    {initializeWithKey, ...productAction})

export default class Categories extends Component {
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
    deleteProduct: PropTypes.func.isRequired,
  };

  render() {
    const { products, onAddProduct, onEditProduct, onDeleteProduct,
            addStartProduct, editStartProduct, deleteStartProduct,
            deleteStopProduct, deleteProduct, _id

    } = this.props;
    const styles = require('containers/Categories/Categories.scss');
    return (
      <div>
        {onAddProduct.isActive && <ProductAdd/>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th className={styles.nameColProd}>Name</th>
              <th className={styles.nameColProd}>Price</th>
              <th className={styles.nameColProd}>Number</th>
              <th className={styles.nameColProd}>Image</th>
              <th className={styles.descriptionCol}>Description</th>
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
          {products && products.map((product) => (onEditProduct.isActive &&
          onEditProduct._id === product._id) ? <ProductEdit key={product._id} initialValues={product}/> :
            <tr key={product._id}>
              <td className={styles.nameColProd}>{product.name}</td>
              <td className={styles.nameColProd}>{product.price}</td>
              <td className={styles.nameColProd}>{product.inStock}</td>
              <td className={styles.nameColProd}>
                <div className={styles.logo}>
                  <p>
                    <img src={'https://facebook.github.io/react/img/logo_og.png'}/>
                  </p>
                </div>
              </td>
              <td className={styles.nameColProd}>{product.description}</td>
              <td className={styles.buttonCol}>
                <button className="btn btn-primary" onClick={() => editStartProduct(product._id)}>
                  <i className="fa fa-pencil"/> Edit
                </button>

                {!onDeleteProduct.isActive ?
                  <button className="btn btn-primary" onClick={() => deleteStartProduct(product._id)}>
                    <i className="fa fa-trash"/> Del
                  </button> :

                  <span>
                    <button className="btn btn-success btn-sm" onClick={() => deleteProduct(product._id)}>
                      <i className={'glyphicon glyphicon-ok'}/>
                    </button>
                    <button className="btn btn-default btn-sm" onClick={() => deleteStopProduct()}>
                      <i className="glyphicon glyphicon-remove"/>
                    </button>
                  </span>
                }
              </td>
            </tr>)
          }
          </tbody>
        </table>
      </div>
    );
  }
}
