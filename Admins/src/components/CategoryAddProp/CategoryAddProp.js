import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as categoryActions from 'redux/modules/categories';

@connect(
  state => ({
    saveError: state.categories.saveError,
    adding: state.categories.adding
  }),
  dispatch => bindActionCreators(categoryActions, dispatch)
)
@reduxForm({
  form: 'categoriesAdd',
  fields: ['_id', 'name', 'type']
})
export default class CategoryAddProp extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    addStopProp: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    // save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    formKey: PropTypes.string.isRequired,
    // name: PropTypes.object.isRequired
    values: PropTypes.object.isRequired,
    adding: PropTypes.array.isRequired,
    addProp: PropTypes.func.isRequired
  };

  render() {
    const {
      addProp, addStopProp, formKey,
      // const { adding, addProp, addStopProp, formKey,
      fields: {_id, name, type}, handleSubmit, submitting, values
    } = this.props;
    const styles = require('./CategoryAddProp.scss');
    console.log('msfnmgsdf: ' + formKey);
    debugger;
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
                  onClick={() => addStopProp(formKey)}
                  disabled={submitting}>
            <i className="fa fa-ban"/> Cancel
          </button>
          <button className="btn btn-success"
                  onClick={handleSubmit(() => addProp(values))}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
          </button>
        </td>
      </tr>
    );
  }
}
