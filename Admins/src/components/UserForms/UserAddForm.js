import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as userActions from 'redux/modules/users';

@connect(
  () => {},
  dispatch => bindActionCreators(userActions, dispatch)
)
@reduxForm({
  form: 'user',
  fields: ['id', 'firstName', 'lastName', 'password', 'admin']
})
export default class UserAddForm extends Component {
  static propTypes = {
    addUser: PropTypes.func.isRequired,
    stopAdd: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired
  };

  render() {
    const { addUser, stopAdd, values, fields: {firstName, lastName, password, admin}} = this.props;
    const styles = require('containers/Orders/Orders.scss');
    return (
      <tr>
        <td className={styles.Name}>
          {/* <input type="text" label = "myTextInput" className="form-control" {...firstName}/>*/}
            <label>
              Name:
               <input type="text" label = "myTextInput" className="form-control" {...firstName}/>
            </label>
        </td>
        <td className={styles.Name}>
          <input type="text" className="form-control" {...lastName}/>
        </td>
        <td className={styles.Name}>
          <input type="text" className="form-control" {...password}/>
        </td>
        <td className={styles.Admin}>
          <input type="text" className="form-control" {...admin}/>
        </td>+
        <td className={styles.Add}>
            <button className="btn btn-success btn-sm" onClick={() => addUser(values)}>
              <i className={'glyphicon glyphicon-ok'}/>
            </button>
            <button className="btn btn-default btn-sm" onClick={() => stopAdd()}>
              <i className="glyphicon glyphicon-remove"/>
            </button>
        </td>
      </tr>
    );
  }
}

