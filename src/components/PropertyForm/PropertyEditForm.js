import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as categoryActions from 'redux/modules/categories';
import propertiesValidation, {types} from './propertiesValidation';
// const typesN = types;
@connect(
  state => ({
    editPropertyBtn: state.categories.editProperty,
    // typesM: state.categories.types
  }),
  dispatch => bindActionCreators(categoryActions, dispatch)
)
@reduxForm({
  form: 'categoryEditProp',
  fields: ['name', 'type'],
  validate: propertiesValidation
})
export default class CategoryEditProp extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStopProperty: PropTypes.func.isRequired,
    editProperty: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    editPropertyBtn: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    // typesM: PropTypes.array
  };

  render() {
    const {editStopProperty, fields: {name, type}, editProperty, values, editPropertyBtn, submitting, pristine,
    invalid} = this.props;
    const styles = require('./PropertyEditForm.scss');
    return (
      <tr>
        <td className={styles.colorCol}>
          <input type="text" className="form-control" {...name}/>
          {name.error && name.touched ? <div className="text-danger">{name.error}</div> :
              <div>{'\xa0'}</div>}
        </td>

        <td className={styles.sprocketsCol}>
          <select name="type" className="form-control" {...type}>
            {types.map(valueType => <option value={valueType} key={valueType}>{valueType}</option>)}
          </select>
          {types.error && types.touched ? <div className="text-danger">{types.error}</div> :
              <div>{'\xa0'}</div>}
        </td>

        <td className={styles.buttonColl}>
          <button className="btn btn-success"
                  onClick={() => editProperty(values, editPropertyBtn.id, editPropertyBtn.name)}
                  disabled={pristine || invalid || submitting}>
          <i className="glyphicon glyphicon-ok"/>
          </button>

          <button className="btn btn-default" onClick={() => editStopProperty()}>
            <i className="glyphicon glyphicon-remove"/>
          </button>
          <div>{'\xa0'}</div>
        </td>
      </tr>
    );
  }
}
