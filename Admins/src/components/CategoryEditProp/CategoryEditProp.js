import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as categoryActions from 'redux/modules/categories';

@connect(
  state => ({
    saveError: state.categories.saveError
  }),
  dispatch => bindActionCreators(categoryActions, dispatch)
)
@reduxForm({
  form: 'categoryEditProp',
  fields: ['_id', 'name', 'type']
})
export default class CategoryEditProp extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStopProp: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    saveProp: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    formKey: PropTypes.string.isRequired,
    // name: PropTypes.object.isRequired
    values: PropTypes.object.isRequired,
    nameOld: PropTypes.string.isRequired

  };

  render() {
    const { editStopProp, formKey, fields: {_id, name, type}, handleSubmit, saveProp, submitting, values, nameOld} = this.props;
    const styles = require('./CategoryEditProp.scss');
    console.log('msfnmgsdf: ' + formKey);
    return (
      <tr className={submitting ? styles.saving : ''}>
        <td className={styles.idCol}>{_id.value}</td>
        <td className={styles.colorCol}>
          <input type="text" className="form-control" {...name}/>
        </td>

        <td className={styles.sprocketsCol}>
          <input type="text" className="form-control" {...type}/>
        </td>

        <td className={styles.buttonColl}>
          <button className="btn btn-default"
                  onClick={() => editStopProp(name.value)}
                   disabled={submitting}>
            <i className="fa fa-ban"/> Cancel
          </button>
          <button className="btn btn-success"
                   onClick={handleSubmit(() => saveProp(formKey, values, nameOld))}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
          </button>
        </td>
      </tr>
    );
  }
}
