import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as categoryActions from 'redux/modules/categories';

@connect(
  state => ({
    addPropertyBtn: state.categories.addProperty
  }),
  dispatch => bindActionCreators(categoryActions, dispatch)
)
@reduxForm({
  form: 'categoriesAdd',
  fields: ['name', 'type']
})
export default class CategoryAddProp extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    addStopProperty: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    addProperty: PropTypes.func.isRequired,
    addPropertyBtn: PropTypes.object.isRequired,
  };

  render() {
    const { addStopProperty, addProperty, addPropertyBtn, fields: { name, type}, values } = this.props;
    const styles = require('./CategoryAddProp.scss');
    return (
      <div>
        <label className={styles.colorCol}>
          Name
          <input type="text" className="form-control" {...name}/>
        </label>

        <label className={styles.sprocketsCol}>
          Value
          <input type="text" className="form-control" {...type}/>
        </label>

        <button className="btn btn-success"
                onClick={() => addProperty(values, addPropertyBtn.id)}>
          <i className="glyphicon glyphicon-ok"/>
        </button>
        <button className="btn btn-default" onClick={() => addStopProperty()}>
          <i className="glyphicon glyphicon-remove"/>
        </button>
      </div>
    );
  }
}
