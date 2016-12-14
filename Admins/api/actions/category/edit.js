import * as categoryDB from './../../DbApi/Categories';
import convert from './convert';

export default function update(req) {
  return new Promise((resolve, reject) => {
    const id = req.body.category.id;
    const name = req.body.category.name;

    categoryDB.editCategoryName(id, name).then(() => {
      categoryDB.getCategories().then( data => {
        resolve(convert(data));
      });
    }).catch(error => {
      reject(error);
    });
  console.log('come from ' + JSON.stringify(req.body));

  });
}
