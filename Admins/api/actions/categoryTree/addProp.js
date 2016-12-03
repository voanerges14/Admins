import * as CategoriesDB from './../../DbApi/Categories';
import load from './load';

export default function addProp(req) {
  return new Promise((resolve, reject) => {
    // CategoriesDB.addPropertyToCategory(req.body.id, req.body).then(result => {
    //   console.log('res: ' + result);
    //   return result;
  console.log('addProp ' + req.body.name + ' ' + req.body.type + ' id: ' + req.body.id)
  }).catch(error => {
      reject('error in addProp: ' + error);
    // });
  });
}
