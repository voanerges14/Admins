import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as userActions from 'redux/modules/users';

@connect(
  state => ({
    isAdminTemp: state.users.isAdminEdit
  }), dispatch => bindActionCreators(userActions, dispatch)
)
@reduxForm({
  form: 'user',
  fields: ['id', 'firstName', 'lastName', 'email', 'phone', 'address', 'password', 'admin']
})
export default class UserAddForm extends Component {
  static propTypes = {
    changeAdminEdit: PropTypes.func.isRequired,
    isAdminTemp: PropTypes.object.isRequired,
    editUser: PropTypes.func.isRequired,
    stopEdit: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
  };

  render() {
    const { editUser, stopEdit, values, changeAdminEdit, isAdminTemp,
      fields: {id, firstName, lastName, email, phone, address, password}} = this.props;
    const styles = require('containers/Users/Users.scss');
    return (
      <tr>
        <td colSpan="8">
        <label className={styles.EditFormIn}> first name
          <input type="text" className="form-control" {...firstName}/>
        </label>

        <label className={styles.EditFormIn}> last name
          <input type="text" className="form-control" {...lastName}/>
        </label>

        <label className={styles.EditFormIn}> password
          <input type="text" className="form-control" {...password}/>
        </label>

        <label className={styles.EditFormIn}> email
          <input type="text" className="form-control" {...email}/>
        </label>

        <label className={styles.EditFormIn}> phone
          <input type="text" className="form-control" {...phone}/>
        </label>

        <label className={styles.EditFormAddress}> address
          <input type="text" className="form-control" {...address}/>
        </label>

        <button className={styles.EditFormAdmin + ' btn btn-secondary btn-md'}
                onClick={() => changeAdminEdit(id.value, isAdminTemp[id.value])}>
          {isAdminTemp[id.value] ? <div>Admin</div> : <div>User</div>}
        </button>

        <button className="btn btn-success btn-sm" onClick={() => editUser(values, isAdminTemp[id.value])}>
          <i className={'glyphicon glyphicon-ok'}/>
        </button>

        <button className="btn btn-default btn-sm" onClick={() => stopEdit(id.value)}>
          <i className="glyphicon glyphicon-remove"/>
        </button>
        </td>
      </tr>
    );
  }
}

