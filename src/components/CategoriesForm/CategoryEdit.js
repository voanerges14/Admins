import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as categoryActions from 'redux/modules/categories';
import categoriesValidation from './categoriesValidation';

@connect(
  state => ({
    editCategoryBtn: state.categories.editCategory
  }),
  dispatch => bindActionCreators(categoryActions, dispatch)
)
@reduxForm({
  form: 'categoriesEdit',
  fields: ['name'],
  validate: categoriesValidation
})
export default class CategoryEdit extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStopCategory: PropTypes.func.isRequired,
    editCategoryBtn: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired
  };

  render() {
    const { editStopCategory, fields: {name}, editCategoryBtn, editCategory, values, submitting, invalid, pristine} = this.props;
    const styles = require('./CategoryAdd.scss');
    return (
      <div className={styles.Form}>
        <input type="text" {...name}/>
        {name.error && name.touched ? <div className="text-danger">{name.error}</div> :
            <div>{'\xa0'}</div>}
        <div>
          <span>
          <button className="btn btn-success btn-sm"
                  onClick={() => editCategory({ 'id': editCategoryBtn.id, 'name': values.name }) }
                  disabled={pristine || invalid || submitting}>
            <i className={'glyphicon glyphicon-ok'}/>
          </button>
          <button className="btn btn-default btn-sm" onClick={() => editStopCategory() }>
            <i className="glyphicon glyphicon-remove"/>
          </button>
        </span>
        </div>
          <div>{'\xa0'}</div>
      </div>
    );
  }
}
