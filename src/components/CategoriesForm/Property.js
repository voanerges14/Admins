import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as categoryActions from 'redux/modules/categories';
import {initializeWithKey} from 'redux-form';
import {CategoryEditProp, CategoryAddProp} from 'components';

@connect(
    state => ({
      addPropertyBtn: state.categories.addProperty,
      editPropertyBtn: state.categories.editProperty,
      deletePropertyBtn: state.categories.deleteProperty
    }),
    {...categoryActions, initializeWithKey})

export default class Categories extends Component {
  static propTypes = {
    properties: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
    addPropertyBtn: PropTypes.object.isRequired,
    editPropertyBtn: PropTypes.object.isRequired,
    deletePropertyBtn: PropTypes.object.isRequired,
    addStartProperty: PropTypes.func.isRequired,
    editStartProperty: PropTypes.func.isRequired,
    deleteStartProperty: PropTypes.func.isRequired,
    deleteStopProperty: PropTypes.func.isRequired,
    deleteProperty: PropTypes.func.isRequired
  };
  render() {
    const { addPropertyBtn, editPropertyBtn, deletePropertyBtn, addStartProperty, editStartProperty,
        deleteStartProperty, deleteStopProperty, deleteProperty, properties, _id } = this.props;
    const styles = require('./Product.scss');

    return (
      <div>
        {addPropertyBtn.isActive && <CategoryAddProp/>}
        {properties && properties.length ?
          <table className="table table-striped">
            <thead>
            <tr>
              <th className={styles.nameCol}>Name</th>
              <th className={styles.typeCol}>Type</th>
              {!addPropertyBtn.isActive &&
              <th className={styles.btnCol}>
                <button className="btn btn-primary" onClick={() => {
                  addStartProperty(_id);
                }}>
                  <i className="glyphicon glyphicon-plus"/>ADD
                </button>
              </th>
              }
            </tr>
            </thead>
            <tbody>
            {
              properties && properties.length && properties.map((property) => (editPropertyBtn.isActive &&
              (property.name === editPropertyBtn.name) && (_id === editPropertyBtn.id)) ?

                  <CategoryEditProp key={property.name} initialValues={property}/> :

                  <tr key={property.name}>
                    <td className={styles.nameCol}>{property.name}</td>
                    <td className={styles.typeCol}>{property.type}</td>
                    <td className={styles.btnCol}>
                      <button className="btn btn-primary" onClick={() => editStartProperty(property.name, _id)}>
                        <i className="fa fa-pencil"/>
                      </button>
                      {
                        deletePropertyBtn.isActive && (deletePropertyBtn.id === _id) &&
                        (deletePropertyBtn.name === property.name) ?
                            <span>
                      <button className="btn btn-success btn-sm"
                              onClick={() => deleteProperty(_id, property.name)}>
                        <i className={'glyphicon glyphicon-ok'}/>
                      </button>
                      <button className="btn btn-default btn-sm" onClick={() => deleteStopProperty()}>
                        <i className="glyphicon glyphicon-remove"/>
                      </button>
                    </span> :

                            <button className="btn btn-primary"
                                    onClick={() => deleteStartProperty(property.name, _id)}>
                              <i className="fa fa-trash"/>
                            </button>
                      }
                    </td>
                  </tr>)
            }
            </tbody>
          </table>
        :
          <div>
            {!addPropertyBtn.isActive &&
              <th className={styles.buttonCol}>
              <button className="btn btn-primary" onClick={() => {addStartProperty(_id);}}>
              <i className="glyphicon glyphicon-plus"/>ADD
              </button>
              </th>
            }
            <div>We don't have any properties (((</div>
          </div>
        }
      </div>
    );
  }
}
