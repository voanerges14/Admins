import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
import {LoginForm} from 'components';

@connect(
    state => ({user: state.auth.user}),
    authActions)
export default
class LoginSuccess extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  render() {
    const {user} = this.props;
    return (user &&
      <div className="container">
        <h1>Login Success</h1>

        <LoginForm />

      </div>
    );
  }
}
