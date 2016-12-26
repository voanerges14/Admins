import * as categoryDB from './../../DbApi/Categories';

export default function edit(req) {
  return new Promise((resolve, reject) => {
    const id = req.body.category.id;
    const newName = req.body.category.name;
    categoryDB.editCategoryName(id, newName).then(category => {
      resolve(category);
    }).catch(error => {
      reject(error);
    });
  });
}
