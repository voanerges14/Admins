import {db} from "./index";

function connectToDbCategoriesModel() {
  let Categories = new db.Schema({
    _id: { type: db.Schema.Types.ObjectId, required: true },
    parentId: { type: String, required: true },
    name: { type: db.Schema.Types.String, required: true },
    properties: {type: Array, required: true}
  });
  return db.mongoose.model('Categories', Categories);
}

const CategoriesModel = connectToDbCategoriesModel();

export function getCategories() {
  return CategoriesModel.find({}).sort('parentId').exec(function (err, categories) {
    if(!err) {
      return categories;
    }
    console.error('getCategories error: ' + err);
    return 'error in getCategories: ' + err;
  });
}

export function addCategory(category) {
  return CategoriesModel.create(category, function(err) {
    if (!err) {
      return CategoriesModel.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, category) {
        if(!err) {
          return category;
        }
        else {
          console.error('addCategory error1: ' + err);
          return 'error1 in addCategory: ' + err;
        }
      });
    }
    else {
      console.error('addCategory error2: ' + err);
      return 'error2 in addCategory: ' + err;
    }
  });
}

export function editCategoryName(id, categoryName) {
  return CategoriesModel.findById(id, function (err, category) {
    if (err) {
      console.error('editCategoryName error1: ' + err);
      return 'error1 in editCategoryName: ' + err;
    }
    category.name = categoryName;
    category.save(function (err, updatedCategory) {
      if (err) {
        console.error('editCategoryName error2: ' + err);
        return 'error2 in editCategoryName: ' + err;
      }
      return updatedCategory;
    });
  });
}

export function deleteCategory(id) {
  return CategoriesModel.remove({ _id: id }, function(err) {
    if (!err) {
      return 0;
    }
    else {
      console.error('deleteCategory error: ' + err);
      return 'error in deleteCategory: ' + err;
    }
  });
}

export function deleteCategories(ids) {
  return CategoriesModel.remove({'_id': {$in: ids}}).exec(function(err, result) {
    if(!err) {
      return result;
    }
    console.log('deleteCategories error: ' + err);
    return 'error in deleteCategories: ' + err;
  });
}

export function addPropertyToCategory(id, property) {
  return CategoriesModel.findById(id, function (err, category) {
    if (err) {
      console.error('addPropertyToCategory error1: ' + err);
      return 'error1 in addPropertyToCategory: ' + err;
    }
    category.properties.push({'name': property.name, 'type': property.type});
    category.save(function (err, updatedCategory) {
      if (err) {
        console.error('addPropertyToCategory error2: ' + err);
        return 'error2 in addPropertyToCategory: ' + err;
      }
      return updatedCategory;
    });
  });
}

export function editPropertyOfCategory(id, oldProperty, editedProperty) {
  return CategoriesModel.findById(id, function (err, category) {
    if (err) {
      console.error('editPropertyOfCategory error1: ' + err);
      return 'error1 in editPropertyOfCategory: ' + err;
    }
    for(let i = 0; i < category.properties.length; ++i) {
      if(category.properties[i].name == oldProperty) {
        category.properties.splice(i, 1, editedProperty);
        break;
      }
    }
    category.save(function (err, updatedCategory) {
      if (err) {
        console.error('editPropertyOfCategory error2: ' + err);
        return 'error2 in editPropertyOfCategory: ' + err;
      }
      return updatedCategory;
    });
  });
}

export function deletePropertyFromCategory(id, property) {
  return CategoriesModel.findById(id, function (err, category) {
    if (err) {
      console.error('deletePropertyFromCategory error1: ' + err);
      return 'error1 in deletePropertyFromCategory: ' + err;
    }
    for(let i = 0; i < category.properties.length; ++i) {
      if(category.properties[i].name == property) {
        category.properties.splice(i, 1);
        break;
      }
    }
    category.save(function (err, updatedCategory) {
      if (err) {
        console.error('deletePropertyFromCategory error2: ' + err);
        return 'error in deletePropertyFromCategory2: ' + err;
      }
      return updatedCategory;
    });
  });
}
