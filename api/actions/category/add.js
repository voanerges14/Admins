import * as categoryDB from './../../DbApi/Categories';

export default function add(req) {
  return new Promise((resolve, reject) => {
    const parentId = req.body.category.parentId;
    const name = req.body.category.name;
    const property = req.body.category.property;
    categoryDB.addCategory({parentId, name, properties: [property]}).then(category => {
      resolve(category);
    }).catch(error => {
      reject(error);
    });
  });
}
