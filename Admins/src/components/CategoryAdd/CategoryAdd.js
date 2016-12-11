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
  form: 'categoriesAdd',
  fields: ['name']
})
export default class CategoryAdd extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    addStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    // formKey: PropTypes.string.isRequired,
    // name: PropTypes.object.isRequired
    values: PropTypes.object.isRequired

  };

  render() {
    const { addStop, fields: {name}, handleSubmit, save, submitting, values} = this.props;
    const styles = require('./CategoryAdd.scss');
    // console.log('msfnmgsdf: ' + formKey);
    return (
      <div className={styles.Form}>
      {/* <tr className={submitting ? styles.saving : ''}>*/}
        {/* <td className={styles.idCol}>{_id.value}</td>*/}
         <td className={styles.formImput}>
         <input type="text" {...name}/>
           </td>

        {/* <td className={styles.buttonColl}>*/}
          <button className="btn btn-default"
                  onClick={() => addStop()}
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
         {/* </td>*/}
       {/* </tr>*/}
      </div>
    );
  }
}
