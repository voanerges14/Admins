import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
import {reduxForm} from 'redux-form';
import logInValidation from './LoginValidator';

@connect(
  state => ({user: state.auth.user}),
  authActions
)
@reduxForm({
  form: 'user',
  fields: ['email', 'password'],
  validate: logInValidation
})
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    fields: PropTypes.object.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    logout: PropTypes.func
  };

  render() {
    const {user, logout, invalid, pristine, submitting, login, values,
        fields: {email, password}} = this.props;
    const styles = require('./LoginForm.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        {!user &&
        <div>
          <form className="login-form form-inline">
            <div className="form-group">
              <input type="text" placeholder="Enter a username" className="form-control" {...email}/>
              <input type="password" placeholder="Enter a password" className="form-control" {...password}/>
            </div>
              <button className="btn btn-success"
                      onClick={() => login(values.email, values.password)}
                      disabled={pristine || invalid || submitting}>
                <i className="fa fa-sign-in"/>{' '}Log In
              </button>
            <div>
              {(email.error && email.touched || password.error && password.touched) &&
                <div className={styles.leftError + ' text-danger'}>{email.error + password.error}</div>}
            </div>
          </form>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.firstName}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}>
              <i className="fa fa-sign-out"/>{' '}Log Out
            </button>
          </div>
        </div>
        }
      </div>

    );
  }
}
