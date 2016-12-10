import * as categoryDB from './../../DbApi/Categories';
import convert from './convert';

export default function deleteProp(req) {
  return new Promise((resolve, reject) => {
    // console.log('my res: ' + JSON.stringify(req.body));
    categoryDB.deletePropertyFromCategory(req.body.id, req.body.name).then(result => {
      // console.log('res: ' + result);
      categoryDB.getCategories().then( data => {
        resolve(convert(data));
      });
    }).catch(error => {
      reject('error in addProp: ' + error);
    });
  });
}