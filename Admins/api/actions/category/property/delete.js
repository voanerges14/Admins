import * as categoryDB from './../../../DbApi/Categories';
import convert from '../convert';

export default function deleteProperty(req) {
  return new Promise((resolve, reject) => {
    categoryDB.deletePropertyFromCategory(req.body.id, req.body.name).then(() => {
      categoryDB.getCategories().then( data => {
        resolve(convert(data));
      });
    }).catch(error => {
      reject('error in addProp: ' + error);
    });
  });
}