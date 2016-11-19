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
    // fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    formKey: PropTypes.string.isRequired,
    name: PropTypes.object.isRequired
  };

  render() {
    const { editStop, formKey, handleSubmit, save, submitting, name} = this.props;
    const styles = require('containers/Categories/Categories.scss');
    console.log('msfnmgsdf: ' + formKey);
    return (
      <tr className={submitting ? styles.saving : ''}>
        {/* <td className={styles.idCol}>{id.value}</td>*/}

        <td className={styles.ownerCol}>
          <input type="text" className="form-control" value={formKey}/>
        </td>

        <td className={styles.buttonCol}>
          <button className="btn btn-default"
                  onClick={() => editStop(formKey)}
                  disabled={submitting}>
            <i className="fa fa-ban"/> Cancel99
          </button>
          <button className="btn btn-success"
                  onClick={handleSubmit(() => save(name)
                    .then(result => {
                      if (result && typeof result.error === 'object') {
                        return Promise.reject(result.error);
                      }
                    })
                  )}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save99
          </button>
        </td>
      </tr>
    );
  }
}
