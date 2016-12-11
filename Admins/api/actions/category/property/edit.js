import * as categoryDB from '../../../DbApi/Categories';
import convert from '../convert';

export default function editProperty(req) {
  return new Promise((resolve, reject) => {
    const props = req.body.property;
    const idC = req.body.id;
    const nameOld = req.body.oldName;
    categoryDB.editPropertyOfCategory(idC, nameOld, props).then( () =>{
      categoryDB.getCategories().then( res => {
        const data = convert(res);
        resolve({data});
      });
    }).catch(err => {
      reject('error edit categoryProps: ' + err);
    });
  });
}
