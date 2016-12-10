import React, {Component, PropTypes} from 'react';
import {StyleRoot} from 'radium';
import {Treebeard, decorators, Hello} from '../../components';
import Helmet from 'react-helmet';
// const Switch = require('components');
// import data from './data';
import styles from './styles';
import * as filters from './filter';
import {isLoaded, load as loadCategories} from 'redux/modules/categories';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import * as categoryActions from 'redux/modules/categories';
// import * as categoryActions from 'redux/modules/categories';
// import {isLoaded, load as loadCategories} from 'redux/modules/categories';
import {initializeWithKey} from 'redux-form';

import {CategoryEditProp, CategoryAddProp, CategoryAdd} from 'components';
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
    editingProp: state.categories.editingProp,
    error: state.categories.error,
    loading: state.categories.loading,
    adding: state.categories.adding,
    addingProp: state.categories.addingProp,
    onDelete: state.categories.onDelete
  }),
  {...categoryActions, initializeWithKey})

export default
class Categories extends Component {

  static propTypes = {
    categories: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editingProp: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStartProp: PropTypes.func.isRequired,
    addStartProp: PropTypes.func.isRequired,
    addStart: PropTypes.func.isRequired,
    addingProp: PropTypes.array.isRequired,
    adding: PropTypes.object.isRequired,
    deleteStartProp: PropTypes.func.isRequired,
    deleteStopProp: PropTypes.func.isRequired,
    deleteProp: PropTypes.func.isRequired,
    onDelete: PropTypes.object.isRequired
  };

  //
  constructor(props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
    this.onFilterMouseUp = this.onFilterMouseUp.bind(this);
    // this.onKeyUp = this.onKeyUp.bind(this);
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
    // console.log('filter: ' + filter);
    // console.log('categories: ' + this.props.categories[0].name);
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
    const handleEditProp = (prop) => {
      const {editStartProp} = this.props; // eslint-disable-line no-shadow
      return () => editStartProp(String(prop.name));
    };
    const handleAddProp = (prop) => {
      const {addStartProp} = this.props; // eslint-disable-line no-shadow
      return () => addStartProp(String(prop._id));
    };
    const handleAdd = () => {
      const {addStart} = this.props; // eslint-disable-line no-shadow
      return () => addStart(0);
    };
    const handleDeletePropStart = (id, name) => {
      const {deleteStartProp} = this.props;
      return () => deleteStartProp(id, name);
    };
    const handleDeletePropStop = (id, name) => {
      const {deleteStopProp} = this.props;
      return () => deleteStopProp(id, name);
    };
    const handleDeleteProp = (id, name) => {
      const {deleteProp} = this.props;
      return () => deleteProp(id, name);
    };

    const {categories, load, loading, editingProp, addingProp, adding, onDelete} = this.props;
    const deleteBtns = (id, name) => {
      if (!onDelete) {
        return false;
      }
      return (typeof onDelete[id] === 'undefined') ? false : onDelete[id][name];
    };

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const st = require('./../../containers/Categories/Categories.scss');
    return (
      <div>
        <h1>Categories
          <button className={st.refreshBtn + ' btn btn-success'} onClick={load}>
            <i className={refreshClassName}/> {' '} Reload
          </button>
        </h1>
        <Helmet title="Categories"/>
        <StyleRoot style={styles.component3}>
          <div style={styles.searchBox}>
            <div className="input-group">
            <span className="input-group-addon">
            <i className="fa fa-search"/>
            </span>
              <input type="text"
                     className="form-control"
                     placeholder="Search the tree..."
                     onKeyUp={this.onFilterMouseUp.bind(this)}
              />
            </div>
          </div>
          {categories &&
          <div style={styles.component}>
            <div className={styles.mycell}>
                <span>
              {!adding[0] &&
              <button className="btn btn-link btn-xs" onClick={handleAdd()}>
                <span className="glyphicon glyphicon-plus"/>
              </button>}
                  <Hello/>
                </span>
            </div>
             {adding[0] && <CategoryAdd formKey={adding[1]} initialValues={adding}/>}
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
                {/* <th className={styles.idCol}>ID</th>*/}
                <th className={styles.colorCol}>Name</th>
                <th className={styles.sprocketsCol}>Type</th>
                {!addingProp[0] &&
                <th className={styles.ownerCol}>
                  <button className="btn btn-primary" onClick={handleAddProp(chousenNode)}>
                    <i className="glyphicon glyphicon-plus"/>ADD
                  </button>
                </th>}
              </tr>
              {addingProp[0] && <CategoryAddProp formKey={addingProp[1]} initialValues={addingProp[1]}/>}
              </thead>
              <tbody>
              {!addingProp[0] && chousenNode.properties &&
              chousenNode.properties.map((prop) => editingProp[prop.name] ?
                <CategoryEditProp formKey={String(chousenNode._id)} key={String(prop.name)} initialValues={prop}
                                  nameOld={prop.name}/> :
                <tr key={prop.name}>
                  <td classoName={styles.colorCol}>{prop.name}</td>
                  <td className={styles.sprocketsCol}>{prop.type}</td>
                  <td className={styles.buttonCol}>
                    <button className="btn btn-primary" onClick={handleEditProp(prop)}>
                      <i className="fa fa-pencil"/> Edit
                    </button>

                    {!deleteBtns(chousenNode._id, prop.name) ?
                    <button className="btn btn-primary"
                            onClick={handleDeletePropStart(chousenNode._id, prop.name)}>
                      <i className="fa fa-trash"/> Del
                    </button> :
                    <span>
                      <button className="btn btn-success btn-sm"
                              onClick={handleDeleteProp(chousenNode._id, prop.name)}>
                        <i className={'glyphicon glyphicon-ok'}/>
                      </button>
                      <button className="btn btn-default btn-sm"
                              onClick={handleDeletePropStop(chousenNode._id, prop.name)}>
                        <i className="glyphicon glyphicon-remove"/>
                      </button>
                    </span>}
                  </td>
                </tr>)
              }
              {/* {chousenNode &&*/}
              {/* <div>*/}
              {/* <td>Rename</td>*/}
              {/* <CategoryAdd formKey={String(chousenNode.name)}*/}
              {/* key={String(chousenNode.name)}*/}
              {/* initialValues={chousenNode}*/}
              {/* />*/}
              {/* </div>}*/}
              </tbody>
            </table>}


          </div>
        </StyleRoot>
      </div>

    );
  }
}
