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
import {connectToDb} from "./index";

function connectToDbCategoriesModel() {
  let mongoose = connectToDb();
  let Schema = mongoose.Schema;
  let Categories = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    parentId: { type: String, required: true },
    name: { type: String, required: true },
    properties: {type: Array, required: true}
  });

  let CategoriesModel = mongoose.model('Categories', Categories);
  return CategoriesModel;
}

var CategoriesModel = connectToDbCategoriesModel();

export function getCategories() {
  return CategoriesModel.find({}, function (err, docs) {
    if(!err) {
      return docs;
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
      console.error('deleteCategory: ' + err);
      return 'error in deleteCategory: ' + err;
    }
  });
}

export function addPropertyToCategory(id, property) {
  return CategoriesModel.findById(id, function (err, category) {
    if (err) {
      console.error('addPropertyToCategory error: ' + err);
      return 'error in addPropertyToCategory: ' + err;
    }
    category.properties.push({'name': property});
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
    category.remove(category.properties.indexOf({name: oldProperty}));
    category.push({name: editedProperty});
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
    category.remove(category.properties.indexOf({name: property}));
    category.save(function (err, updatedCategory) {
      if (err) {
        console.error('deletePropertyFromCategory error: ' + err);
        return 'error in deletePropertyFromCategory: ' + err;
      }
      return updatedCategory;
    });
  });
}




