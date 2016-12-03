import * as categoryDB from './../../DbApi/Categories';
export default function updateProp(req) {
  return new Promise((resolve, reject) => {
    const props = req.body;
    const idC = req.body.idC;
    const nameOld = req.body.nameOld;
        categoryDB.editPropertyOfCategory(idC, nameOld, props).then( prop =>{
          console.log('Cat values' + JSON.stringify(widget, null, ' '));
          resolve(idC, nameOld, prop)

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
