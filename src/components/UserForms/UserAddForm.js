import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as userActions from 'redux/modules/users';
import userValidation from './userValidation';

@connect(
  state => ({
    admin: state.users.isAdminAdd
  }),
  dispatch => bindActionCreators(userActions, dispatch)
)
@reduxForm({
  form: 'user',
  fields: ['id', 'firstName', 'lastName', 'email', 'password', 'admin'],
  validate: userValidation
})
export default class UserAddForm extends Component {
  static propTypes = {
    addUser: PropTypes.func.isRequired,
    stopAdd: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    changeAdminAdd: PropTypes.func.isRequired,
    admin: PropTypes.bool.isRequired,
  };

  render() {
    const { addUser, stopAdd, values, changeAdminAdd, admin, invalid, pristine, submitting,
        fields: {firstName, lastName, email, password}} = this.props;
    const styles = require('containers/Users/Users.scss');
    return (
      <div>
        <div className={styles.AddForm}>
          <label> first name </label>
          <input type="text" className="form-control" {...firstName}/>
          {firstName.error && firstName.touched && <div className="text-danger">{firstName.error}</div>}
        </div>

         <div className={styles.AddForm}>
          <label> last name </label>
          <input type="text" className={styles.AddFormButton + ' form-control'} {...lastName}/>
          {lastName.error && lastName.touched && <div className="text-danger">{lastName.error}</div>}
        </div>

        <label className={styles.AddForm}> email
          <input type="text" className="form-control" {...email}/>
          {email.error && email.touched && <div className="text-danger">{email.error}</div>}
        </label>

        <label className={styles.AddForm}> password
          <input type="password" className="form-control" {...password}/>
           {password.error && password.touched && <div className="text-danger">{password.error}</div>}
        </label>

        <button className={styles.AddFormButton + ' btn btn-secondary btn-md'}
                onClick={() => changeAdminAdd(admin)}>
          {admin ? <div>Admin</div> : <div>User</div>}
        </button>

        <button className="btn btn-success btn-sm" onClick={() => addUser(values, admin)}
                disabled={pristine || invalid || submitting}>
          <i className={'glyphicon glyphicon-ok'}/>
        </button>

        <button className="btn btn-default btn-sm" onClick={() => stopAdd()}>
          <i className="glyphicon glyphicon-remove"/>
        </button>
      </div>
    );
  }
}

