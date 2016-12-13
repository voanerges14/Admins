import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions
)

export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    this.props.login(username.value, password.value);
    username.value = password.value = '';
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./LoginForm.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
              <input type="password" ref="password" placeholder="Enter a password" className="form-control"/>
              <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
              </button>
            </div>
          </form>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>

    );
  }
}
