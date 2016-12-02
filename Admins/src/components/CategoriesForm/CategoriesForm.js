/**
 * Created by pavlo on 09.11.16.
 */
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
  form: 'categories',
  fields: ['id', 'name']
})
export default class CategoriesForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    formKey: PropTypes.string.isRequired,
    // name: PropTypes.object.isRequired
    values: PropTypes.object.isRequired

  };

  render() {
    const { editStop, fields: {id, name}, formKey, handleSubmit, save, submitting, values} = this.props;
    // debugger;
    const styles = require('containers/CategoriesOLD/CategoriesOLD.scss');
    console.log('msfnmgsdf: ' + formKey);
    return (
      <tr className={submitting ? styles.saving : ''}>
         <td className={styles.idCol}>{id.value}</td>

        <td className={styles.ownerCol}>
          <input type="text" className="form-control" {...name}/>
        </td>

        <td className={styles.buttonCol}>
          <button className="btn btn-default"
                  onClick={() => editStop(formKey)}
                  disabled={submitting}>
            <i className="fa fa-ban"/> Cancel
          </button>
          <button className="btn btn-success"
                  onClick={handleSubmit(() => save(values)
                    .then(result => {
                      if (result && typeof result.error === 'object') {
                        return Promise.reject(result.error);
                      }
                    })
                  )}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
          </button>
        </td>
      </tr>
    );
  }
}
