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
    editCategoryBtn: state.categories.editCategory
  }),
  dispatch => bindActionCreators(categoryActions, dispatch)
)
@reduxForm({
  form: 'categories',
  fields: ['name']
})
export default class CategoryEdit extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStopCategory: PropTypes.func.isRequired,
    editCategoryBtn: PropTypes.object.isRequired,
    editCategory: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired
  };

  render() {
    const { editStopCategory, fields: {name}, editCategory, editCategoryBtn, values} = this.props;
    // const styles = require('containers/CategoriesOLD/CategoriesOLD.scss');
    return (
      <div>
        <input type="text" className="form-control" {...name}/>
        <span>
          <button className="btn btn-success btn-sm"
                  onClick={() => editCategory({ id: editCategoryBtn.id, name: values.name }) }>
            <i className={'glyphicon glyphicon-ok'}/>
          </button>
          <button className="btn btn-default btn-sm" onClick={() => editStopCategory() }>
            <i className="glyphicon glyphicon-remove"/>
          </button>
        </span>
      </div>
    );
  }
}
