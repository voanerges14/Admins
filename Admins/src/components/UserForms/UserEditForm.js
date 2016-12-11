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
      <div className={styles.AddForm}>
        <label className={styles.AddForm}> first name
          <input type="text" {...firstName}/>
        </label>

        <label className={styles.AddForm}> last name
          <input type="text" {...lastName}/>
        </label>

        <label className={styles.AddForm}> password
          <input type="text" {...password}/>
        </label>

        <label className={styles.AddForm}> email
          <input type="text" {...email}/>
        </label>

        <label className={styles.AddForm}> phone
          <input type="text" {...phone}/>
        </label>

        <label className={styles.AddForm}> address
          <input type="text" {...address}/>
        </label>

        <button className={styles.AddForm + ' btn btn-secondary btn-sm'}
                onClick={() => changeAdminEdit(id.value, isAdminTemp[id.value])}>
          {isAdminTemp[id.value] ? <div>Admin</div> : <div>User</div>}
        </button>

        <button className="btn btn-success btn-sm" onClick={() => editUser(values, isAdminTemp[id.value])}>
          <i className={'glyphicon glyphicon-ok'}/>
        </button>

        <button className="btn btn-default btn-sm" onClick={() => stopEdit(id.value)}>
          <i className="glyphicon glyphicon-remove"/>
        </button>
      </div>
    );
  }
}

