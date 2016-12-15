import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as categoryActions from 'redux/modules/categories';


@connect(
  state => ({
    editPropertyBtn: state.categories.editProperty,
    types: state.categories.types
  }),
  dispatch => bindActionCreators(categoryActions, dispatch)
)
@reduxForm({
  form: 'categoryEditProp',
  fields: ['name', 'type'],
})
export default class CategoryEditProp extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStopProperty: PropTypes.func.isRequired,
    editProperty: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    editPropertyBtn: PropTypes.object.isRequired,
    types: PropTypes.array.isRequired
  };

  render() {
    const {editStopProperty, fields: {name, type}, editProperty, values, editPropertyBtn, types} = this.props;
    const styles = require('./PropertyEditForm.scss');
    return (
      <tr>
        <td className={styles.colorCol}>
          <input type="text" className="form-control" {...name}/>
        </td>

        <td className={styles.sprocketsCol}>
          <select name="type" className="form-control" {...type}>
            {types.map(valueType => <option value={valueType} key={valueType}>{valueType}</option>)}
          </select>
        </td>

        <td className={styles.buttonColl}>
          <button className="btn btn-success"
                  onClick={() => editProperty(values, editPropertyBtn.id, editPropertyBtn.name)}>
            <i className="glyphicon glyphicon-ok"/>
          </button>

          <button className="btn btn-default" onClick={() => editStopProperty()}>
            <i className="glyphicon glyphicon-remove"/>
          </button>

        </td>
      </tr>
    );
  }
}
