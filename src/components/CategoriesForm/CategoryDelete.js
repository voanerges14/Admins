import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoryActions from 'redux/modules/categories';

@connect(
  state => ({
    deleteCategory: state.categories.deleteCategory
  }),
  dispatch => bindActionCreators(categoryActions, dispatch)
)

export default class CategoryAdd extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    addStopCategory: PropTypes.func.isRequired,
    addCategoryBtn: PropTypes.object.isRequired,
    addCategory: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired
  };

  render() {
    const { addStopCategory, fields: {name}, addCategoryBtn, addCategory, values} = this.props;
    const styles = require('./CategoryAdd.scss');
    return (
      <div className={styles.Form}>
        <input type="text" {...name}/>
        <span>
          <button className="btn btn-success btn-sm"
                  onClick={() => addCategory({ parentId: addCategoryBtn.parentId, name: values.name }) }>
            <i className={'glyphicon glyphicon-ok'}/>
          </button>
          <button className="btn btn-default btn-sm" onClick={() => addStopCategory() }>
            <i className="glyphicon glyphicon-remove"/>
          </button>
        </span>
      </div>
    );
  }
}
