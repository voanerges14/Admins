import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as categoryActions from 'redux/modules/categories';

@connect(
  state => ({
    editPropertyBtn: state.categories.editProperty
  }),
  dispatch => bindActionCreators(categoryActions, dispatch)
)
@reduxForm({
  form: 'categoryEditProp',
  fields: ['name', 'type']
})
export default class CategoryEditProp extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStopProperty: PropTypes.func.isRequired,
    editProperty: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    editPropertyBtn: PropTypes.object.isRequired,
  };

  render() {
    const {editStopProperty, fields: {name, type}, editProperty, values, editPropertyBtn} = this.props;
    const styles = require('./CategoryEditProp.scss');
    return (
      <tr>
        <td className={styles.colorCol}>
          <input type="text" className="form-control" {...name}/>
        </td>

        <td className={styles.sprocketsCol}>
          <input type="text" className="form-control" {...type}/>
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
