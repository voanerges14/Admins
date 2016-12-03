import * as categoryDB from './../../DbApi/Categories';
import convert from './convert';

export default function addProp(req) {
  return new Promise((resolve, reject) => {
    // console.log('req: ' + JSON.stringify(req.body));
    categoryDB.addPropertyToCategory(req.body.id, req.body.prop).then(result => {
      console.log('res: ' + result);
      categoryDB.getCategories().then( data => {
        resolve(convert(data));
      });
    }).catch(error => {
      reject('error in addProp: ' + error);
    });
  });
}
