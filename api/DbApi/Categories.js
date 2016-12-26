import {db} from './index';

function connectToDbCategoriesModel() {
  const Categories = new db.Schema({
    parentId: { type: String, required: true },
    name: { type: db.Schema.Types.String, required: true },
    properties: {type: Array, required: true, default: []}
  }, { minimize: false });
  return db.mongoose.model('Categories', Categories);
}

const CategoriesModel = connectToDbCategoriesModel();

export function getCategories() {
  return new Promise((resolve, reject) => {
    CategoriesModel.find({}).sort('parentId').exec().then(categories => {
      resolve(categories);
    }).catch(err => {
      console.error('getCategories error: ' + err);
      reject('error in getCategories: ' + err);
    });
  });
}

export function getCategoriesByIds(ids) {
  return new Promise((resolve, reject) => {
    CategoriesModel.find({'_id': {$in: ids}}).sort('parentId').exec().then(categories => {
      resolve(categories);
    }).catch(err => {
      console.error('getCategoriesByIds error: ' + err);
      reject('error in getCategoriesByIds: ' + err);
    });
  });
}

export function addCategory(category) {
  return new Promise((resolve, reject) => {
    const newCategory = new CategoriesModel(category);
    newCategory.save().then(addedCategory => {
      resolve(addedCategory);
    }).catch(err => {
      console.error('addCategory error: ' + err);
      reject('error in addCategory: ' + err);
    });
  });
}

export function editCategoryName(id, categoryName) {
  return new Promise((resolve, reject) => {
    CategoriesModel.findOneAndUpdate({'_id': id}, {$set: {'name': categoryName}}, {new: true})
      .then(category => {
        resolve(category);
      }).catch(err => {
        console.error('editCategoryName error: ' + err);
        reject('error in editCategoryName: ' + err);
      });
  });
}

export function deleteCategory(id) {
  return new Promise((resolve, reject) => {
    CategoriesModel.remove({ _id: id }).then(() => {
      resolve();
    }).catch(err => {
      console.error('deleteCategory: ' + err);
      reject('error in deleteCategory: ' + err);
    });
  });
}

export function deleteCategories(ids) {
  return new Promise((resolve, reject) => {
    CategoriesModel.remove({'_id': {$in: ids}}).exec().then(() => {
      resolve();
    }).catch(err => {
      console.error('deleteCategories: ' + err);
      reject('error in deleteCategories: ' + err);
    });
  });
}

export function addPropertyToCategory(id, property) {
  return new Promise((resolve, reject) => {
    CategoriesModel.findById(id).then(category => {
      category.properties.push({'name': property.name, 'type': property.type});
      category.save().then(updatedCategory => {
        resolve(updatedCategory);
      });
    }).catch(err => {
      console.error('addPropertyToCategory error: ' + err);
      reject('error in addPropertyToCategory: ' + err);
    });
  });
}

export function editPropertyOfCategory(id, oldProp, editedProperty) {
  return new Promise((resolve, reject) => {
    CategoriesModel.findById(id).then(category => {
      const index = category.properties.findIndex(function(elem) {return elem.name.toString() === oldProp;});
      category.properties.splice(index, 1, editedProperty);
      category.save().then(updatedCategory => {
        resolve(updatedCategory);
      });
    }).catch(err => {
      console.error('editPropertyOfCategory error: ' + err);
      reject('error in editPropertyOfCategory: ' + err);
    });
  });
}

export function deletePropertyFromCategory(id, propName) {
  return new Promise((resolve, reject) => {
    CategoriesModel.findById(id).then(category => {
      const index = category.properties.findIndex(function(elem) {return elem.name.toString() === propName;});
      category.properties.splice(index, 1);
      category.save().then(updatedCategory => {
        resolve(updatedCategory);
      });
    }).catch(err => {
      console.error('deletePropertyFromCategory error: ' + err);
      reject('error in deletePropertyFromCategory: ' + err);
    });
  });
}
