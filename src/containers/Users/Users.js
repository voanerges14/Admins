import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as usersActions from 'redux/modules/users';
import {isLoaded, load as loadUsers} from 'redux/modules/users';
// import {initializeWithKey} from 'redux-form';
import { asyncConnect } from 'redux-async-connect';
import { UserAddForm, UserEditForm } from 'components';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadUsers());
    }
  }
}])
@connect(
  state => ({
    users: state.users.data,
    editBtn: state.users.editBtn,
    deleteBtn: state.users.deleteBtn,
    addBtn: state.users.addBtn,
    error: state.users.errorList,
    loading: state.orders.loading
  }),
  {...usersActions })
export default class Orders extends Component {
  static propTypes = {
    users: PropTypes.array,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired,
    editBtn: PropTypes.object.isRequired,
    deleteBtn: PropTypes.object.isRequired,
    addBtn: PropTypes.bool.isRequired,
    startAdd: PropTypes.func.isRequired,
    startEdit: PropTypes.func.isRequired,
    startDelete: PropTypes.func.isRequired,
    stopDelete: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
  };
  render() {
    const { users, loading, load, startEdit, startAdd, startDelete, addBtn, editBtn, deleteBtn,
       stopDelete, deleteUser } = this.props;
    const deleteBtns = (id) => {
      return (typeof deleteBtn[id] === 'undefined') ? false : deleteBtn[id];
    };
    const editBtns = (id) => {
      return (typeof editBtn[id] === 'undefined') ? false : editBtn[id];
    };
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Users.scss');
    return (
      <div className={styles.users + ' container'}>
        <h1>
          Users
          <button className={styles.RefreshBtn + ' btn btn-success'} onClick={load}>
            <i className={refreshClassName}/> {' '} Reload Users
          </button>
          {!addBtn &&
          <button className={styles.Add + ' btn btn-success'} onClick={() => {startAdd();}}>
            <i className="glyphicon glyphicon-plus"/> Add Users
          </button>}
        </h1>
        {addBtn && <UserAddForm/> }
        <Helmet title="Users"/>
        {users && users.length &&
        <table className={styles.table + ' Table table-striped'}>
          <thead> <tr>
            <th className={styles.IdUser}>№</th>
            <th className={styles.Name}>Users</th>
            <th className={styles.Mail}>@Mail</th>
            <th className={styles.Number}>Phone number</th>
            <th className={styles.AddressMain}>Address</th>
            <th className={styles.Admin}>Admin/User</th>
            <th className={styles.Edit}>Edit</th>
            <th className={styles.Delete}>Delete</th>
          </tr> </thead>
          <tbody> { users.map((user, index) =>
            editBtns(user.id) ? <UserEditForm key={user.id} initialValues={user}/> :
            <tr key={user.id}>
              <td className={styles.IdUser} id={user.id}>
                { index + 1 }.
              </td>
              <td className={styles.Name}>
                { user.firstName + ' ' + user.lastName }
              </td>
              <td className={styles.Mail}>
                { user.email }
              </td>
              <td className={styles.Number}>
                { user.phone }
              </td>
              <td className={styles.Address}>
                { user.address }
              </td>
              <td className={styles.Admin}>
                {user.admin ? <div>Admin</div> : <div>User</div>}
              </td>
              <td className={styles.Edit}>
                < button className="btn btn-primary btn-sm" onClick={() => startEdit(user.id)}>
                  <i className="fa fa-pencil"/> Edit
                </button>
              </td>
              <td className={styles.Delete}>
                {!deleteBtns(user.id) &&
                <button className="btn btn-danger btn-sm" onClick={() => startDelete(user.id)}>
                  <i className="glyphicon glyphicon-remove"/> Delete
                </button>}

                {deleteBtns(user.id) && <div>
                  <button className="btn btn-success btn-sm" onClick={() => deleteUser(user.id)}>
                    <i className={'glyphicon glyphicon-ok'}/>
                  </button>
                  <button className="btn btn-default btn-sm" onClick={() => stopDelete(user.id)}>
                    <i className="glyphicon glyphicon-remove"/>
                  </button></div>}
              </td>
            </tr>)}
          </tbody>
        </table>}
      </div>
    );
  }
}

