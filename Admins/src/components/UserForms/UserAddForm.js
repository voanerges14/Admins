import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as userActions from 'redux/modules/users';

@connect(
  state => ({
    admin: state.users.isAdminAdd
  }),
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
    fields: PropTypes.object.isRequired,
    changeAdminAdd: PropTypes.func.isRequired,
    admin: PropTypes.bool.isRequired,
  };

  render() {
    const { addUser, stopAdd, values, changeAdminAdd, admin, fields: {firstName, lastName, password}} = this.props;
    const styles = require('containers/Users/Users.scss');
    return (
      <div className={styles.AddForm}>
          <label className={styles.AddForm}> first name
            <input type="text" className="form-control" {...firstName}/>
          </label>

          <label className={styles.AddForm}> last name
            <input type="text" className="form-control" {...lastName}/>
          </label>

          <label className={styles.AddForm}> password
            <input type="text" className="form-control" {...password}/>
          </label>

          <button className={styles.AddForm + ' btn btn-secondary btn-md'} onClick={() => changeAdminAdd(admin)}>
            {admin ? <div>Admin</div> : <div>User</div>}
          </button>

          <button className="btn btn-success btn-sm" onClick={() => addUser(values, admin)}>
            <i className={'glyphicon glyphicon-ok'}/>
          </button>

          <button className="btn btn-default btn-sm" onClick={() => stopAdd()}>
            <i className="glyphicon glyphicon-remove"/>
          </button>
      </div>
    );
  }
}

