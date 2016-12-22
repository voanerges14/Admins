import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as categoryActions from 'redux/modules/categories';
import categoriesValidation, {types} from './categoriesValidation';

@connect(
  state => ({
    addCategoryBtn: state.categories.addCategory,
    // types: state.categories.types
  }),
  dispatch => bindActionCreators(categoryActions, dispatch)
)
@reduxForm({
  form: 'categoriesAdd',
  fields: ['name', 'propertyName', 'propertyType'],
  validate: categoriesValidation
})
export default class CategoryAdd extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    addStopCategory: PropTypes.func.isRequired,
    addCategoryBtn: PropTypes.object.isRequired,
    addCategory: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired
  };

  render() {
    const {
      addStopCategory, addCategoryBtn, addCategory, values,
      fields: {name, propertyName, propertyType}, submitting, invalid, pristine
    } = this.props;
    const styles = require('./CategoryAdd.scss');

    return (
      <div className={styles.Form}>
        <label className={styles.colorCol}>
          Category name
          <input type="text" className="form-control" {...name}/>
          {name.error && name.touched ? <div className="text-danger">{name.error}</div> :
              <div>{'\xa0'}</div>}
        </label>
        <label className={styles.colorCol}>
          Property name
          <input type="text" className="form-control" {...propertyName}/>
          {propertyName.error && propertyName.touched ? <div className="text-danger">{propertyName.error}</div> :
          <div>{'\xa0'}</div>}

        </label>
        <label className={styles.sprocketsCol}>
          Property type
          <select name="type" className="form-control" {...propertyType}>
            {types.map(valueType => <option value={valueType} key={valueType}>{valueType}</option>)}
          </select>
          {types.error && types.touched ? <div className="text-danger">{types.error}</div> :
              <div>{'\xa0'}</div>}
        </label>
          <label>
          <button className="btn btn-success btn-sm"
                  onClick={() => addCategory({
                    parentId: addCategoryBtn.parentId,
                    name: values.name,
                    property: {'name': propertyName.value, 'type': propertyType.value}
                  }) }
                  disabled={pristine || invalid || submitting}>
            <i className={'glyphicon glyphicon-ok'}/>
          </button>
          <button className="btn btn-default btn-sm" onClick={() => addStopCategory() }>
            <i className="glyphicon glyphicon-remove"/>
          </button>
            <div>{'\xa0'}</div>

          </label>

      </div>
    );
  }
}
