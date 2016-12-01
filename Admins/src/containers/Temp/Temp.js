import React, {Component, PropTypes} from 'react';
import {StyleRoot} from 'radium';
import {Treebeard, decorators} from '../../components';
import Helmet from 'react-helmet';

// import data from './data';
import styles from './styles';
import * as filters from './filter';
import {isLoaded, load as loadCategories} from 'redux/modules/categories';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import * as categoryActions from 'redux/modules/categories';

// import * as categoryActions from 'redux/modules/categories';
// import {isLoaded, load as loadCategories} from 'redux/modules/categories';
import {initializeWithKey} from 'redux-form';

import { CategoriesForm} from 'components';


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
    loading: state.categories.loading,
    adding: state.categories.adding
  }),
  {...categoryActions, initializeWithKey })

export default
class Temp extends Component {

  static propTypes = {
    categories: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired,
    addStart: PropTypes.func.isRequired,
    adding: PropTypes.array.isRequired
  };

  //
  constructor(props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled) {
    /* позначає виділеним при кліку і забирає коли клікнуте іншу*/
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({cursor: node});
  }

  onFilterMouseUp(ee) {
    const filter = ee.target.value.trim();
    console.log('filter: ' + filter);
    console.log('categories: ' + this.props.categories[0].name);
    if (!filter) {
      return this.setState(this.props.categories);
    }
    let filtered = filters.filterTree(this.props.categories, filter);
    filtered = filters.expandFilteredNodes(filtered, filter);
    this.props.categories = filtered;
    // this.setState({data: filtered});
  }

  render() {
    const chousenNode = this.state.cursor;
    // if (!json) {
    //   json = HELP_MSG;
    // } else {
    //   json = this.state.cursor;
    // }
    // const add = this.props;
    const handleEdit = (category) => {
      const {editStart} = this.props; // eslint-disable-line no-shadow
      return () => editStart(String(category.id));
    };
    const handleAdd = (category) => {
      const {addStart} = this.props; // eslint-disable-line no-shadow
      console.log('category: ' + category);
      console.log('category.id: ' + category.id);
      return () => addStart(String(category.id));
    };
    const {categories, load, loading, editing, adding} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const st = require('../Categories/Categories.scss');
    return (
      <div>
        <h1>Temp
         <button className={st.refreshBtn + ' btn btn-success'} onClick={load}>
           <i className={refreshClassName}/> {' '} Reload
         </button>
        </h1>
        <Helmet title="CategoriesTree"/>
         <StyleRoot style={styles.component3}>
           <div style={styles.searchBox}>
             <div className="input-group">
            <span className="input-group-addon">
            <i className="fa fa-search"></i>
            </span>
               <input type="text"
                      className="form-control"
                      placeholder="Search the tree..."
                      onKeyUp={this.onFilterMouseUp.bind(this)}
               />
             </div>
           </div>
           {categories &&
           <div style={styles.component} >
            <Treebeard
              data={categories}
              onToggle={this.onToggle}
              decorators={decorators}
            />

           </div>}
            <div style={styles.component2}>
              {/* <NodeViewer node={chousenNode.name}/>*/}
              {chousenNode && <table className="table table-striped">
                <thead>
                <tr>
                  {/* <td>Property</td>*/}
                  <th className={styles.idCol}>ID</th>
                  <th className={styles.colorCol}>Name</th>
                  <th className={styles.sprocketsCol}>Type</th>
                  <th className={styles.ownerCol}>
                     <button className="btn btn-primary" onClick={handleAdd(chousenNode)}>
                     <i className="glyphicon glyphicon-plus"/>ADD
                     </button>
                  </th>
                  <th className={styles.buttonCol}></th>
                </tr>
                {adding[0] && <CategoriesForm formKey={adding[1]} key={String(adding[1])} initialValues={adding[1]}/>}
                </thead>
                <tbody>
                {console.log('ADD: ' + adding[0] + ' , ' + adding[1])}
                {!adding[0] && chousenNode.children &&
                  chousenNode.children.map((prop) => editing[prop.id] ?
                    <CategoriesForm formKey={String(prop.id)} key={String(prop.id)} initialValues={prop}/> :
                    <tr key={prop.id}>
                      <td className={styles.idCol}>{prop.id}</td>
                      <td className={styles.colorCol}>{prop.name}</td>
                      <td className={styles.sprocketsCol}>{prop.name}</td>
                      <td className={styles.buttonCol}>
                        <button className="btn btn-primary" onClick={handleEdit(prop)}>
                          <i className="fa fa-pencil"/> Edit
                        </button>
                        <button className="btn btn-primary" onClick={handleEdit(prop)}>
                          <i className="fa fa-pencil"/> Del
                        </button>
                      </td>
                    </tr>)
                }
                <th>Rename</th>
                {chousenNode &&
                <CategoriesForm formKey={String(chousenNode.name)}
                                key={String(chousenNode.name)}
                                initialValues={chousenNode}
                />}
                </tbody>
              </table>}


            </div>
         </StyleRoot>

      </div>

    );
  }
}
