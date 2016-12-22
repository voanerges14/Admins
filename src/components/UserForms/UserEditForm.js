import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as userActions from 'redux/modules/users';
import userValidation from './userValidation';

@connect(
  state => ({
    isAdminTemp: state.users.isAdminEdit
  }), dispatch => bindActionCreators(userActions, dispatch)
)
@reduxForm({
  form: 'user',
  fields: ['id', 'firstName', 'lastName', 'email', 'phone', 'address', 'password', 'admin'],
  validate: userValidation
})
export default class UserAddForm extends Component {
  static propTypes = {
    changeAdminEdit: PropTypes.func.isRequired,
    isAdminTemp: PropTypes.object.isRequired,
    editUser: PropTypes.func.isRequired,
    stopEdit: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    _id: PropTypes.string.isRequired
  };

  render() {
    const { editUser, stopEdit, values, changeAdminEdit, isAdminTemp, _id,
      fields: {firstName, lastName, email, phone, address, password}} = this.props;
    const styles = require('containers/Users/Users.scss');
    return (
      <tr>
        <td colSpan="8">
        <label className={styles.EditFormIn}> first name
          <input type="text" className="form-control" {...firstName}/>
          {firstName.error && firstName.touched ? <div className="text-danger">{firstName.error}</div>
              : <p>{'\xa0'}</p>}
        </label>

        <label className={styles.EditFormIn}> last name
          <input type="text" className="form-control" {...lastName}/>
          {lastName.error && lastName.touched ? <div className="text-danger">{lastName.error}</div>
              : <p>{'\xa0'}</p>}
        </label>

        <label className={styles.EditFormIn}> password
          <input type="password" className="form-control" {...password}/>
          <p>{'\xa0'}</p>
        </label>

        <label className={styles.EditFormIn}> email
          <input type="text" className="form-control" {...email}/>
          {email.error && email.touched ? <div className="text-danger">{email.error}</div>
              : <p>{'\xa0'}</p>}
        </label>

        <label className={styles.EditFormIn}> phone
          <input type="text" className="form-control" {...phone}/>
          {phone.error && phone.touched ? <div className="text-danger">{phone.error}</div>
              : <p>{'\xa0'}</p>}
        </label>

        <label className={styles.EditFormAddress}> address
          <input type="text" className="form-control" {...address}/>
          <p>{'\xa0'}</p>
        </label>

        <label>
          <button className={styles.EditFormAdmin + ' btn btn-secondary btn-md'}
                  onClick={() => changeAdminEdit(_id, isAdminTemp[_id])}>
            {isAdminTemp[_id] ? <div>Admin</div> : <div>User</div>}
          </button>
          <p>{'\xa0'}</p>
        </label>

        <label>
          <button className="btn btn-success btn-sm" onClick={() => editUser(values, isAdminTemp[_id])}>
            <i className={'glyphicon glyphicon-ok'}/>
          </button>
          <p>{'\xa0'}</p>
        </label>

        <label>
          <button className="btn btn-default btn-sm" onClick={() => stopEdit(_id)}>
            <i className="glyphicon glyphicon-remove"/>
          </button>
          <p>{'\xa0'}</p>
        </label>
        </td>
      </tr>
    );
  }
}

