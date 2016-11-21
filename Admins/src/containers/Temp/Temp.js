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

import { CategoriesForm } from 'components';

// const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

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

// class NodeViewer extends React.Component {
//   static propTypes = {
//     node: PropTypes.object
//   };
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     const style = styles.viewer;
//     let json = JSON.stringify(this.props.node, null, 4);
//     if (!json) {
//       json = HELP_MSG;
//     }
//     return (
//       <div style={style.base}>
//         {json}
//       </div>
//     );
//   }
// }

export default
class Temp extends Component {

  static propTypes = {
    categories: PropTypes.Object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
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
    if (!filter) {
      return this.setState(this.props.categories);
    }
    let filtered = filters.filterTree(this.props.categories, filter);
    filtered = filters.expandFilteredNodes(filtered, filter);
    this.setState({data: filtered});
  }

  render() {
    const json = this.state.cursor;
    // if (!json) {
    //   json = HELP_MSG;
    // } else {
    //   json = this.state.cursor;
    // }
    const {load, loading, categories} = this.props;
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
         <StyleRoot>
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
          </div>
            }
          <div style={styles.component}>

            {/* {json  &&*/}
            {/* <CategoriesForm formKey={this.state.cursor.name}*/}
                            {/* key={this.state.cursor.name}*/}
                            {/* name={this.state.cursor.name} />*/}
            {/* }*/}
            {json &&
            <CategoriesForm formKey={json.name}
                            key={json.name}
                            name={json.name}
            />}

            {/* <NodeViewer node={this.state.cursor}/>*/}

          </div>
         </StyleRoot>

      </div>

    );
  }
}
