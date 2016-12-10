// collection Categories:
// {
//   "_id",
//     "parentId",
//     "name": String,
//   "properties": [
//       { "name": "os" }, ...
//    ]
// }
// when close connections?

import {db} from "./index";


function connectToDbCategoriesModel() {
  let Categories = new db.Schema({
    _id: { type: db.Schema.Types.ObjectId, required: true },
    parentId: { type: String, required: true },
    name: { type: db.Schema.Types.String, required: true },
    properties: {type: Array, required: true}
  });

  // let Categories = new db.Schema({
  //   _id: { type: db.Schema.Types.ObjectId, required: true },
  //   id: { type: db.Schema.Types.String, required: true },
  //   name: { type: db.Schema.Types.String, required: true },
  //   children: {type: Array, required: true},
  // });
  // , {collection : 'temp' });
  let CategoriesModel = db.mongoose.model('Categories', Categories);
  return CategoriesModel;
}

var CategoriesModel = connectToDbCategoriesModel();

export function getCategories() {
  return CategoriesModel.find({}).sort('parentId').exec(function (err, categories) {
    if(!err) {
      return categories;
    }
    console.error('getCategories error: ' + err);
    return 'error in getCategories: ' + err;
  });
}

export function editCategoryName(id, categoryName) {
  return CategoriesModel.findById(id, function (err, category) {
    if (err) {
      console.error('editCategoryName error: ' + err);
      return 'error in editCategoryName: ' + err;
    }
    category.name = categoryName;
    category.save(function (err, updatedCategory) {
      if (err) {
        console.error('editCategoryName error: ' + err);
        return 'error in editCategoryName: ' + err;
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
      console.error('deleteCategory.js: ' + err);
      return 'error in deleteCategory.js: ' + err;
    }
  });
}

export function deleteCategories(ids) {
  return CategoriesModel.remove({ _id: id }, function(err) {
    if (!err) {
      return 0;
    }
    else {
      console.error('deleteCategory.js: ' + err);
      return 'error in deleteCategory.js: ' + err;
    }
  });
}

export function addPropertyToCategory(id, property) {
  return CategoriesModel.findById(id, function (err, category) {
    if (err) {
      console.error('addPropertyToCategory error: ' + err);
      return 'error in addPropertyToCategory: ' + err;
    }
    category.properties.push({'name': property.name, 'type': property.type});
    category.save(function (err, updatedCategory) {
      if (err) {
        console.error('addPropertyToCategory error: ' + err);
        return 'error in addPropertyToCategory: ' + err;
      }
      return updatedCategory;
    });
  });
}

export function editPropertyOfCategory(id, oldProperty, editedProperty) {
  return CategoriesModel.findById(id, function (err, category) {
    if (err) {
      console.error('editPropertyOfCategory error: ' + err);
      return 'error in editPropertyOfCategory: ' + err;
    }
    for(let i = 0; i < category.properties.length; ++i) {
      if(category.properties[i].name == oldProperty) {
        category.properties.splice(i, 1, editedProperty);
        break;
      }
    }
    category.save(function (err, updatedCategory) {
      if (err) {
        console.error('editPropertyOfCategory error: ' + err);
        return 'error in editPropertyOfCategory: ' + err;
      }
      return updatedCategory;
    });
  });
}

export function deletePropertyFromCategory(id, property) {
  return CategoriesModel.findById(id, function (err, category) {
    if (err) {
      console.error('deletePropertyFromCategory error: ' + err);
      return 'error in deletePropertyFromCategory: ' + err;
    }
    for(let i = 0; i < category.properties.length; ++i) {
      if(category.properties[i].name == property) {
        category.properties.splice(i, 1);
        break;
      }
    }
    category.save(function (err, updatedCategory) {
      if (err) {
        console.error('deletePropertyFromCategory error: ' + err);
        return 'error in deletePropertyFromCategory: ' + err;
      }
      return updatedCategory;
    });
  });
}




