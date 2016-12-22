import * as categoryDB from './../../DbApi/Categories';
import convert from './convert';

export default function update(req) {
  return new Promise((resolve, reject) => {
    const parentId = req.body.category.parentId;
    const name = req.body.category.name;
    const property = req.body.category.property
    console.log('come from ' + JSON.stringify(property));
    categoryDB.addCategory({parentId, name, properties:[property]}).then( category => {
      resolve(category);
      // categoryDB.getCategories().then( data => {
      //   resolve(convert(data));
      // });
    }).catch(error => {
      reject(error);
    });
  });
}
