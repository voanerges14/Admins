import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as categoryActions from 'redux/modules/categories';
import {isLoaded, load as loadCategories} from 'redux/modules/categories';
import {initializeWithKey} from 'redux-form';
import { CategoriesForm } from 'components';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadCategories());
    }
  }
}])
@connect(
  state => ({
    categories: state.categories.data,
    editing: state.categories.editing,
    error: state.categories.error,
    loading: state.categories.loading
  }),
  {...categoryActions, initializeWithKey })
export default class Categories extends Component {
  static propTypes = {
    categories: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  };

  render() {
    const handleEdit = (category) => {
      const {editStart} = this.props; // eslint-disable-line no-shadow
      return () => editStart(String(category.id));
    };
    const {categories, error, editing, loading, load} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./CategoriesOLD.scss');
    return (
      <div className={styles.categories + ' container'}>
        <h1>
          Categories
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
            <i className={refreshClassName}/> {' '} Reload Categories
          </button>
        </h1>
        <Helmet title="Categories"/>

        {/* <p>*/}
          {/* If you hit refresh on your browser, the data loading will take place on the server before the page is returned.*/}
          {/* If you navigated here from another page, the data was fetched from the client after the route transition.*/}
          {/* This uses the decorator method <code>@asyncConnect</code> with the <code>deferred: true</code> flag. To block*/}
          {/* a route transition until some data is loaded, remove the <code>deffered: true</code> flag.*/}
          {/* To always render before loading data, even on the server, use <code>componentDidMount</code>.*/}
        {/* </p>*/}
        {/* <p>*/}
          {/* This categories are stored in your session, so feel free to edit it and refresh.*/}
        {/* </p> */}

        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        {categories && categories.length &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th className={styles.idCol}>ID</th>
            <th className={styles.colorCol}>Name</th>
            <th className={styles.buttonCol}></th>
            <th className={styles.buttonCol}></th>
          </tr>
          </thead>
          <tbody>
          {
            categories.property.map((category) => editing[category.id] ?
              <CategoriesForm formKey={String(category.id)} key={String(category.id)} initialValues={category}/> :
              <tr key={category.id}>
                <td className={styles.idCol}>{category.id}</td>
                <td className={styles.colorCol}>{category.name}</td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-primary" onClick={handleEdit(category)}>
                    <i className="fa fa-pencil"/> Edit99
                  </button>
                  <button className="btn btn-primary" onClick={handleEdit(category)}>
                    <i className="fa fa-pencil"/> Remove99
                  </button>
                </td>
              </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}

