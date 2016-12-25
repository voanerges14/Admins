import * as categoryDB from '../../../DbApi/Categories';

export default function addProperty(req) {
  return new Promise((resolve, reject) => {
    categoryDB.addPropertyToCategory(req.body.id, req.body.property).then(category => {
      resolve(category);
    }).catch(error => {
      reject('error in addProp: ' + error);
    });
  });
}
