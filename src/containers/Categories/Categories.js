import React, {Component, PropTypes} from 'react';
import {StyleRoot} from 'radium';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import * as styles from './Categories.scss';
import * as filters from './filter';
import {isLoaded, load as loadCategories} from 'redux/modules/categories';
import * as categoryActions from 'redux/modules/categories';
import * as productsActions from 'redux/modules/products';
import {initializeWithKey} from 'redux-form';
import {Treebeard, decorators, CategoryAdd, CategoryEdit, Property, Product} from 'components';

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
    editCategoryBtn: state.categories.editCategory,
    deleteCategoryBtn: state.categories.deleteCategory,

    loading: state.categories.loading,
    show: state.categories.show,
    products: state.products.data,
    loadProducts: state.products.loadProducts

  }),
  {...categoryActions, initializeWithKey, ...productsActions})


export default
class Categories extends Component {
  static propTypes = {
    addCategoryBtn: PropTypes.object.isRequired,
    editCategoryBtn: PropTypes.object.isRequired,
    deleteCategoryBtn: PropTypes.object.isRequired,
    addStartCategory: PropTypes.func.isRequired,
    editStartCategory: PropTypes.func.isRequired,
    deleteStartCategory: PropTypes.func.isRequired,
    loadProducts: PropTypes.func.isRequired,
    categories: PropTypes.array,
    products: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    changeShow: PropTypes.func.isRequired,
    deleteStopCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    initializeWithKey: PropTypes.func.isRequired
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
    const categories = this.state.categories;
    if (!filter) {
      return this.setState({categories});
    }
    let filtered = filters.filterTree(categories, filter);
    filtered = filters.expandFilteredNodes(filtered, filter);
    this.props.categories = filtered;
    this.setState({categories: filtered});
  }
  render() {
    const chosenNode = this.state.cursor;
    const { addCategoryBtn, categories, load, loading, show, editStartCategory, deleteStartCategory,
        addStartCategory, editCategoryBtn, changeShow, loadProducts, deleteCategory, deleteStopCategory,
        deleteCategoryBtn} = this.props;

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }

    return (
      <div>
        <h1>Categories
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={() => {load(); loadProducts();}}>
            <i className={refreshClassName}/> {' '} Reload
          </button>
        </h1>

        <Helmet title="Categories"/>
        <StyleRoot className={styles.component3}>
          {/* <div style={styles.searchBox}>*/}
            {/* <div className="input-group">*/}
              {/* <span className="input-group-addon"> <i className="fa fa-search"/> </span>*/}
              {/* <input type="text"*/}
                     {/* className="form-control"*/}
                     {/* placeholder="Search the tree..."*/}
                     {/* onKeyUp={this.onFilterMouseUp.bind(this)}/>*/}
            {/* </div>*/}
          {/* </div>*/}
          {categories &&
            <div className={styles.component}>
              <div className={styles.component}>
              {!addCategoryBtn.isActive && <button className="btn btn-link btn-xl"
                                                   onClick={() => {
                                                     addStartCategory(0);
                                                   }}>
                <span className="glyphicon glyphicon-plus"/>
              </button>}
             </div>
            <div className={styles.component2}>
              <button className="btn btn-primary" onClick={() => changeShow(show)}>
                <i className="glyphicon glyphicon-sort"/>
                {show ? ' Properties ' : ' Products   '}
              </button>
            </div>
            {editCategoryBtn.isActive && <CategoryEdit initialValues={{'name': editCategoryBtn.name}}/>}
              <Treebeard
                data={categories}
                onToggle={this.onToggle}
                onAddToggle={addStartCategory}
                onRemoveToggle={[deleteStartCategory, deleteCategory, deleteCategoryBtn, deleteStopCategory]}
                onEditToggle={editStartCategory}
                loadProducts={loadProducts}
                decorators={decorators}
              />
            </div>
          }
          <div className={styles.component2}>
            {addCategoryBtn.isActive &&
              <CategoryAdd/>
            }

            {chosenNode && chosenNode.active && show &&
              <Property _id={chosenNode._id} properties={chosenNode.properties}/>
            }
            {/* console.log('chosenNode ' + JSON.stringify(chosenNode.properties, null, 4)) &&*/}
            {/* {chosenNode && chosenNode.active}*/}
            {chosenNode && !show &&
              <Product _id={chosenNode._id}/>
            }
          </div>
        </StyleRoot>
      </div>
    );
  }
}
