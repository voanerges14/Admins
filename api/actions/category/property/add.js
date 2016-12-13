import * as categoryDB from '../../../DbApi/Categories';
import convert from '../convert';

export default function addProperty(req) {
  return new Promise((resolve, reject) => {
    categoryDB.addPropertyToCategory(req.body.id, req.body.property).then(() => {
      categoryDB.getCategories().then( data => {
        resolve(convert(data));
      });
    }).catch(error => {
      reject('error in addProp: ' + error);
    });
  });
}
