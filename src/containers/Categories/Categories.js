import React, {Component, PropTypes} from 'react';
import {StyleRoot} from 'radium';
import {Treebeard, decorators, Hello, ImageUpload} from '../../components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import * as styles from './Categories.scss';
import * as filters from './filter';
import {isLoaded, load as loadCategories} from 'redux/modules/categories';
import * as categoryActions from 'redux/modules/categories';
import * as showSome from 'redux/modules/hello';
import * as productAction from 'redux/modules/products';
import {initializeWithKey} from 'redux-form';
import {CategoryEditProp, CategoryAddProp, CategoryAdd} from '../../components';
import {SkyLightStateless} from 'react-skylight';
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
    addPropertyBtn: state.categories.addProperty,
    editPropertyBtn: state.categories.editProperty,
    deletePropertyBtn: state.categories.deleteProperty,
    loading: state.categories.loading,
    show: state.hello.show,
    onShowImagePopUp: state.products.onShowImagePopUp,
    onShowImageUploader: state.products.onShowImageUploader

  }),
  {...categoryActions, initializeWithKey, ...showSome, ...productAction})

export default
class Categories extends Component {
  static propTypes = {
    addCategoryBtn: PropTypes.object.isRequired,
    addPropertyBtn: PropTypes.object.isRequired,
    editPropertyBtn: PropTypes.object.isRequired,
    deletePropertyBtn: PropTypes.object.isRequired,
    addStartCategory: PropTypes.func.isRequired,
    addStartProperty: PropTypes.func.isRequired,
    editStartProperty: PropTypes.func.isRequired,
    deleteStartProperty: PropTypes.func.isRequired,
    deleteStopProperty: PropTypes.func.isRequired,
    deleteProperty: PropTypes.func.isRequired,

    categories: PropTypes.array,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    show: PropTypes.bool,
    showM: PropTypes.func,

    onShowImagePopUp: PropTypes.func,
    showPopUp: PropTypes.func,
    onShowImageUploader: PropTypes.func,
    showImageUploader: PropTypes.func
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
    const { addCategoryBtn, addPropertyBtn, editPropertyBtn, deletePropertyBtn, addStartCategory,
      addStartProperty, editStartProperty, deleteStartProperty, deleteStopProperty, deleteProperty,
      categories, load, loading, show,
      onShowImagePopUp, showPopUp, showImageUploader, onShowImageUploader} = this.props;

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

        {/* <div>*/}
        {/* <section>*/}
        {/* <h1>React SkyLight</h1>*/}
        {/* <button onClick={() => this.refs.simpleDialog.show()}>Open Modal</button>*/}
        {/* </section>*/}
        {/* <SkyLight hideOnOverlayClicked ref="simpleDialog" title="Hi, I'm a simple modal">*/}

        {/* </SkyLight>*/}
        {/* </div>*/}

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
                                               onClick={() => {addStartCategory(0);}}>
                <span className="glyphicon glyphicon-plus"/>
              </button>}
            </div>
            <div className={styles.component2}><Hello/></div>
            {addCategoryBtn.isActive && <CategoryAdd />}
            <Treebeard
              data={categories}
              onToggle={this.onToggle}
              decorators={decorators}
            />
          </div>}
          <div className={styles.component2}>
            {addPropertyBtn.isActive && <CategoryAddProp/>}
            {chosenNode && show &&
            <table className="table table-striped">
              <thead>
              <tr>
                <th className={styles.nameCol}>Name</th>
                <th className={styles.typeCol}>Type</th>
                {!addPropertyBtn.isActive &&
                <th className={styles.buttonCol}>
                  <button className="btn btn-primary" onClick={() => { addStartProperty(chosenNode._id); }}>
                    <i className="glyphicon glyphicon-plus"/>ADD
                  </button>
                </th>}
              </tr>
              </thead>
              <tbody>
              {chosenNode.properties &&
              chosenNode.properties.map((property) => (editPropertyBtn.isActive &&
              (property.name === editPropertyBtn.name) && (chosenNode._id === editPropertyBtn.id)) ?
                <CategoryEditProp key={property.name} initialValues={property}/> :
                <tr key={property.name}>
                  <td className={styles.nameCol}>{property.name}</td>
                  <td className={styles.typeCol}>{property.type}</td>
                  <td className={styles.buttonCol}>
                    <button className="btn btn-primary"
                            onClick={() => { editStartProperty(property.name, chosenNode._id); }}>
                      <i className="fa fa-pencil"/> Edit
                    </button>
                    {deletePropertyBtn.isActive &&
                      (deletePropertyBtn.id === chosenNode._id) && (deletePropertyBtn.name === property.name) ?
                      <span>
                        <button className="btn btn-success btn-sm"
                                onClick={() => { deleteProperty(chosenNode._id, property.name); }}>
                          <i className={'glyphicon glyphicon-ok'}/>
                        </button>
                        <button className="btn btn-default btn-sm" onClick={() => { deleteStopProperty(); }}>
                          <i className="glyphicon glyphicon-remove"/>
                        </button>
                      </span> :
                      <button className="btn btn-primary"
                              onClick={() => { deleteStartProperty(property.name, chosenNode._id); }}>
                        <i className="fa fa-trash"/> Del
                      </button>}
                  </td>
                </tr>)}
              </tbody>
            </table>}

            {/* the products*/}

            {chosenNode && !show &&
            <table className="table table-striped">
              <thead>
              <tr>
                <th className={styles.nameColProd}>Number</th>
                <th className={styles.nameColProd}>Name</th>
                <th className={styles.nameColProd}>Price</th>
                <th className={styles.nameColProd}>Image</th>
                <th className={styles.nameColProd}>Data</th>
                <th className={styles.descriptionCol}>Description</th>

                {!addPropertyBtn.isActive &&
                <th className={styles.nameColProd}>
                  <button className="btn btn-primary" onClick={() => { deleteStopProperty();}}>
                    <i className="glyphicon glyphicon-plus"/>ADD
                  </button>
                </th>}
              </tr>
              {addPropertyBtn.isActive && <CategoryAddProp formKey={addPropertyBtn.id}/>}
              </thead>
              <tbody>

              {/* {onShowImagePopUp && <div>*/}
                {/* <SkyLightStateless*/}
                  {/* isVisible={onShowImagePopUp}*/}
                  {/* onCloseClicked={() => {*/}
                    {/* showPopUp(onShowImagePopUp);*/}
                  {/* }}*/}
                  {/* title="A Stateless Modal"*/}
                {/* >*/}
                  {/* I'm a Stateless modal!*/}
                {/* </SkyLightStateless>*/}
              {/* </div>}*/}

              {!addPropertyBtn.isActive && chosenNode.properties &&
              chosenNode.properties.map((prop) => editPropertyBtn.isActive ?
                <CategoryEditProp formKey={String(chosenNode._id)} key={String(prop.name)} initialValues={prop}
                                  nameOld={prop.name}/> :
                <tr key={prop.name}>
                  <td className={styles.nameColProd}>{prop.name}</td>
                  <td className={styles.nameColProd}>{prop.type}</td>
                  <td className={styles.nameColProd}>{prop.type}</td>
                  <td className={styles.nameColProd}>
                    <div className={styles.logo}>
                      <p>
                        <img onClick={() => {
                          showPopUp(onShowImagePopUp);
                        }} src={'https://facebook.github.io/react/img/logo_og.png'}/>
                      </p>
                      <div>
                        <SkyLightStateless
                          isVisible={onShowImagePopUp}
                          onCloseClicked={() => {
                            showPopUp(onShowImagePopUp);
                          }}
                        >
                          <button className="btn btn-primary" onClick={() => {
                            showImageUploader(onShowImageUploader);
                          }}>
                            <i className="fa fa-plus"/> ADD
                          </button>
                          {onShowImageUploader && <ImageUpload/>}
                          {!onShowImageUploader &&
                          <div className="table table-striped">
                            { chosenNode.properties.map((propi) =>
                            <span key={propi.name} className={styles.nameColProd}>
                               <p className={styles.logo}><img src={'https://facebook.github.io/react/img/logo_og.png'}/></p>
                              {!deleteProperty.isActive ?
                                <button className="btn btn-primary"
                                        onClick={() => deleteStopProperty() }>
                                  <i className="fa fa-trash"/> Del
                                </button> :
                                <span>
                      <button className="btn btn-success btn-sm"
                              onClick={() => deleteStopProperty()}>
                        <i className={'glyphicon glyphicon-ok'}/>
                      </button>
                      <button className="btn btn-default btn-sm"
                              onClick={() => deleteStopProperty()}>
                        <i className="glyphicon glyphicon-remove"/>
                      </button>
                    </span>}
                            </span>
                          )}
                          </div>
                          }
                        </SkyLightStateless>
                      </div>
                    </div>
                  </td>
                  <td className={styles.nameColProd}>{prop.type}</td>
                  <td className={styles.descriptionCol}>{prop.type}</td>
                  <td className={styles.buttonCol}>
                    <button className="btn btn-primary" onClick={() => { deleteStopProperty(); }}>
                      <i className="fa fa-pencil"/> Edit
                    </button>

                    {!deleteProperty.isActive ?
                      <button className="btn btn-primary" onClick={() => { deleteStopProperty(); }}>
                        <i className="fa fa-trash"/> Del
                      </button> :
                      <span>
                      <button className="btn btn-success btn-sm" onClick={() => { deleteStopProperty();}}>
                        <i className={'glyphicon glyphicon-ok'}/>
                      </button>
                      <button className="btn btn-default btn-sm" onClick={() => { deleteStopProperty(); }}>
                        <i className="glyphicon glyphicon-remove"/>
                      </button>
                    </span>}
                  </td>
                </tr>)
              }
              </tbody>
            </table>}

          </div>
        </StyleRoot>
      </div>

    );
  }
}
