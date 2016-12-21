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

  handleSubmit = (event) => {
    event.preventDefault();
    const email = this.props.values.email.value;
    const password = this.props.values.email.value;
    this.props.login(email, password);
    // email.value = password.value = '';
  };

  render() {
    const {user, logout, invalid, pristine, submitting, fields: {email, password}} = this.props;
    const styles = require('./LoginForm.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
             <tr>
              <input type="text" placeholder="Enter a username" className="form-control" {...email}/>
              <input type="password" placeholder="Enter a password" className="form-control" {...password}/>
               <button className="btn btn-success" onClick={this.handleSubmit}
                       disabled={pristine || invalid || submitting}>
                 <i className="fa fa-sign-in"/>{' '}Log In
               </button>
             </tr>
            <tr>
              {email.error && email.touched &&
                <div className={styles.leftError + ' text-danger'}>{email.error}</div>}
              {password.error && password.touched &&
                <div className={styles.RightError + ' text-danger'}>{password.error}</div>}
            </tr>
            </div>
          </form>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

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
