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
        // console.log("edit prop data " + JSON.stringify(data, null, 4));
        resolve({data});
      });
    }).catch(err => {
      reject('error edit categoryProps: ' + err);
    });
  });
}
