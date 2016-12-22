import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as categoryActions from 'redux/modules/categories';
import propertiesValidation, {types} from './propertiesValidation';

@connect(
  state => ({
    addPropertyBtn: state.categories.addProperty,
    types: state.categories.types
  }),
  dispatch => bindActionCreators(categoryActions, dispatch)
)
@reduxForm({
  form: 'categoriesAdd',
  fields: ['name', 'type'],
  validate: propertiesValidation
})
export default class CategoryAddProp extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    addStopProperty: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    addProperty: PropTypes.func.isRequired,
    addPropertyBtn: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired
  };

  render() {
    const {addStopProperty, addProperty, addPropertyBtn, fields: { name, type}, values,
        submitting, invalid, pristine} = this.props;
    const styles = require('./PropertyAddForm.scss');
    return (
      <div>
        <label className={styles.colorCol}>
          Name
          <input type="text" className="form-control" {...name}/>
          {name.error && name.touched ? <div className="text-danger">{name.error}</div> :
              <div>{'\xa0'}</div>}
        </label>

        <label className={styles.sprocketsCol}>
          Type
          <select name="type" className="form-control" {...type}>
            {types.map(valueType => <option value={valueType} key={valueType}>{valueType}</option>)}
          </select>
          {types.error && types.touched ? <div className="text-danger">{types.error}</div> :
              <div>{'\xa0'}</div>}
          {/* <input type="text" className="form-control" {...type}/>*/}
        </label>
        <label>
        <button className="btn btn-success"
                onClick={() => addProperty(values, addPropertyBtn.id)}
                disabled={pristine || invalid || submitting}>
        <i className="glyphicon glyphicon-ok"/>
        </button>
        <button className="btn btn-default" onClick={() => addStopProperty()}>
          <i className="glyphicon glyphicon-remove"/>
        </button>
          <div>{'\xa0'}</div>
        </label>
      </div>
    );
  }
}
