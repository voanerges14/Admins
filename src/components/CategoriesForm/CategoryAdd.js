import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as categoryActions from 'redux/modules/categories';

@connect(
  state => ({
    addCategoryBtn: state.categories.addCategory,
    types: state.categories.types
  }),
  dispatch => bindActionCreators(categoryActions, dispatch)
)
@reduxForm({
  form: 'categoriesAdd',
  fields: ['name', 'propertyName', 'propertyType']
})
export default class CategoryAdd extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    addStopCategory: PropTypes.func.isRequired,
    addCategoryBtn: PropTypes.object.isRequired,
    addCategory: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    types: PropTypes.array.isRequired
  };

  render() {
    const {
      addStopCategory, addCategoryBtn, addCategory, values, types,
      fields: {name, propertyName, propertyType}
    } = this.props;
    const styles = require('./CategoryAdd.scss');

    return (
      <div className={styles.Form}>
        <label className={styles.colorCol}>
          Category name
          <input type="text" className="form-control" {...name}/>
        </label>
        <label className={styles.colorCol}>
          Property name
          <input type="text" className="form-control" {...propertyName}/>
        </label>
        <label className={styles.sprocketsCol}>
          Property type
          <select name="type" className="form-control" {...propertyType}>
            {types.map(valueType => <option value={valueType} key={valueType}>{valueType}</option>)}
          </select>
        </label>
        <span>
          <button className="btn btn-success btn-sm"
                  onClick={() => addCategory({
                    parentId: addCategoryBtn.parentId,
                    name: values.name,
                    property: {'name': propertyName.value, 'type': propertyType.value}
                  }) }>
            <i className={'glyphicon glyphicon-ok'}/>
          </button>
          <button className="btn btn-default btn-sm" onClick={() => addStopCategory() }>
            <i className="glyphicon glyphicon-remove"/>
          </button>
        </span>
      </div>
    );
  }
}
