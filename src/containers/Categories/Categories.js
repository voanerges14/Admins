import React, {Component, PropTypes} from 'react';
import {StyleRoot} from 'radium';
import {Treebeard, decorators} from '../../components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import * as styles from './Categories.scss';
import * as filters from './filter';
import {isLoaded, load as loadCategories} from 'redux/modules/categories';
import * as categoryActions from 'redux/modules/categories';
import * as showSome from 'redux/modules/hello';
import {initializeWithKey} from 'redux-form';
import {CategoryAdd, Property, Product} from '../../components';
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
      addCategoryBtn: state.categories.addCategory,
      loading: state.categories.loading,
      show: state.categories.show
    }),
    {...categoryActions, initializeWithKey, ...showSome, })

export default class Categories extends Component {
  static propTypes = {
    addCategoryBtn: PropTypes.object.isRequired,
    addStartCategory: PropTypes.func.isRequired,
    categories: PropTypes.array,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired,
    show: PropTypes.bool,
    changeShow: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
    this.onFilterMouseUp = this.onFilterMouseUp.bind(this);
  }

  onToggle(node, toggled) {
    /* позначає виділеним при кліку і забирає коли клікнуте іншу*/
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children && node.children !== []) {
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
    this.props.categories = filtered;
  }

  render() {
    const chosenNode = this.state.cursor;
    const {addCategoryBtn, addStartCategory, categories, load, loading, show, changeShow} = this.props;

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }

    return (
        <div>
          <h1>Categories
            <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
              <i className={refreshClassName}/> {' '} Reload
            </button>
          </h1>

          <Helmet title="Categories"/>
          <StyleRoot className={styles.component3}>
            <div style={styles.searchBox}>
              <div className="input-group">
                <span className="input-group-addon"> <i className="fa fa-search"/> </span>
                <input type="text"
                       className="form-control"
                       placeholder="Search the tree..."
                       onKeyUp={this.onFilterMouseUp.bind(this)}/>
              </div>
            </div>
            {categories &&
            <div className={styles.component}>
              <div className={styles.component}>
                {!addCategoryBtn.isActive && <button className="btn btn-link btn-xs"
                                                     onClick={() => {
                                                       addStartCategory(0);
                                                     }}>
                  <span className="glyphicon glyphicon-plus"/>
                </button>}
              </div>
              <div className={styles.component2}>
                <button className={styles.helloButton} onClick={() => {changeShow(show);}}>
                  {show ? <div>Properties</div> : <div>Products</div>}
                </button>
                {/* <Hello _id={typeof chosenNode === 'undefined' ? '1' : String(chosenNode._id)}/>*/}
              </div>

              {addCategoryBtn.isActive && <CategoryAdd />}
              <Treebeard
                  data={categories}
                  onToggle={this.onToggle}
                  decorators={decorators}
              />
            </div>}
            <div className={styles.component2}>
              {chosenNode && show &&
                <Property _id={chosenNode._id} properties={chosenNode.properties}/>
              }
              {chosenNode && !show &&
                <Product _id={chosenNode._id}/>
              }
            </div>
          </StyleRoot>
        </div>

    );
  }
}
