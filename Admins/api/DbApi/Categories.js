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
function connectToDbOrdersModel() {
  let mongoose = require('mongoose');
  mongoose.connect('mongodb://main:mainmain@ds035995.mlab.com:35995/trueshop1997db');
  let db = mongoose.connection;

  db.on('error', function (err) {
    console.error('connection error:', err.message);
  });
  db.once('open', function callback () {
    console.info("Connected to DB!");
  });

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

var CategoriesModel = connectToDbOrdersModel();

export function getCategories() {
  return CategoriesModel.find({}, function (err, docs) {
    if(!err) {
      return docs;
    }
    console.error('getCategories error: ' + err);
    return err;
  });
}

export function editCategoryName(id, categoryName) {
  return CategoriesModel.findById(id, function (err, category) {
    if (err) {
      console.error('editCategoryName error: ' + err);
      return err;
    }
    category.name = categoryName;
    category.save(function (err, updatedCategory) {
      if (err) {
        console.error('editCategoryName error: ' + err);
        return err;
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
      return err;
    }
  });
}

export function addPropertyToCategory(id, property) {
  return CategoriesModel.findById(id, function (err, category) {
    if (err) {
      console.error('addPropertyToCategory error: ' + err);
      return err;
    }
    category.properties.push({'name': property});
    category.save(function (err, updatedCategory) {
      if (err) {
        console.error('addPropertyToCategory error: ' + err);
        return err;
      }
      return updatedCategory;
    });
  });
}

export function editPropertyOfCategory(id, oldProperty, editedProperty) {
  return CategoriesModel.findById(id, function (err, category) {
    if (err) {
      console.error('editPropertyOfCategory error: ' + err);
      return err;
    }
    category.remove(category.properties.indexOf({name: oldProperty}));
    category.push({name: editedProperty});
    category.save(function (err, updatedCategory) {
      if (err) {
        console.error('editPropertyOfCategory error: ' + err);
        return err;
      }
      return updatedCategory;
    });
  });
}

export function deletePropertyFromCategory(id, property) {
  return CategoriesModel.findById(id, function (err, category) {
    if (err) {
      console.error('deletePropertyFromCategory error: ' + err);
      return err;
    }
    category.remove(category.properties.indexOf({name: property}));
    category.save(function (err, updatedCategory) {
      if (err) {
        console.error('deletePropertyFromCategory error: ' + err);
        return err;
      }
      return updatedCategory;
    });
  });
}




