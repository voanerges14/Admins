import * as categoryDB from './../../DbApi/Categories';
import convert from './convert';

export default function update(req) {
  return new Promise((resolve, reject) => {
    const parentId = req.body.category.parentId;
    const name = req.body.category.name;

    categoryDB.addCategory({parentId, name, properties: [null]}).then(() => {
      categoryDB.getCategories().then( data => {
        resolve(convert(data));
      });
    }).catch(error => {
      reject(error);
    });
  });
}
