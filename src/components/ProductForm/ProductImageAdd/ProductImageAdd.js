import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as productActions from 'redux/modules/products';

@connect(
  state => ({
    onShowImageUploader: state.products.onShowImageUploader,
    onAddProductImage: state.products.onAddProductImage
  }),
  dispatch => bindActionCreators(productActions, dispatch)
)
@reduxForm({
  form: 'ImageAdd',
  fields: ['url']
})
export default class ProductImageAdd extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    addStopImage: PropTypes.func.isRequired,
    ProductBtn: PropTypes.func.isRequired,
    addProductImage: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,

    onAddProductImage: PropTypes.object.isRequired,

  };

  render() {
    const { addStopImageAdd, fields: {url}, addCategoryBtn, addCategory, values} = this.props;
    const styles = require('./CategoryAdd.scss');
    return (
      <div className={styles.Form}>
        <input type="text" {...url}/>
        <span>
          <button className="btn btn-success btn-sm"
                  onClick={() => addCategory({ parentId: addCategoryBtn.parentId, name: values.name }) }>
            <i className={'glyphicon glyphicon-ok'}/>
          </button>
          <button className="btn btn-default btn-sm" onClick={() => addStopImageAdd() }>
            <i className="glyphicon glyphicon-remove"/>
          </button>
        </span>
      </div>
    );
  }
}
