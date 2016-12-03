import * as categoryDB from './../../DbApi/Categories';
import convert from './convert';

export default function updateProp(req) {
  return new Promise((resolve, reject) => {
    const props = req.body.prop;
    const idC = req.body.idC;
    const nameOld = req.body.nameOld;
        categoryDB.editPropertyOfCategory(idC, nameOld, props).then( () =>{
          categoryDB.getCategories().then( res => {
            let data = convert(res);
            resolve({nameOld, data});
          });
        }).catch(err => {
          reject('error edit categoryProps: ' + err);
        });
  });
}


// export default function updateProp(req) {
//   return new Promise((resolve, reject) => {
//   console.log('UPDATED CATEGORY: ' + req.body.name + ' ' + req.body.type);
//
//   }).catch(error => {
//     reject('error in addProp: ' + error);
//     // });
//   });
// }
