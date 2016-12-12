import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as categoryActions from 'redux/modules/categories';

@connect(
  state => ({
    addCategory: state.categories.addCategory,
    addStopCategory: state.categories.addStopCategory
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
    values: PropTypes.object.isRequired,
    addStopCategory: PropTypes.func.isRequired,
    addCategory: PropTypes.func.isRequired
  };

  render() {
    const { fields: {name}, values, addStopCategory, addCategory} = this.props;
    const styles = require('./CategoryAdd.scss');
    // console.log('msfnmgsdf: ' + formKey);
    return (
      <div className={styles.Form}>
         <td className={styles.colorCol}>
         <input type="text" {...name}/>
           </td>
        <span>
          <button className="btn btn-success btn-sm"
            onClick={() => {addCategory(values);}}>
            <i className={'glyphicon glyphicon-ok'}/>
          </button>
          <button className="btn btn-default btn-sm"
                  onClick={() => {addStopCategory();}}>
            <i className="glyphicon glyphicon-remove"/>
          </button>
        </span>
      </div>
    );
  }
}
