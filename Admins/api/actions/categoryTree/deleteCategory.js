import * as categoryDB from './../../DbApi/Categories';
let ids = [];

export default function deleteCategory(req) {
  return new Promise((resolve, reject) => {
    // console.log('my res: ' + JSON.stringify(req.body));

    categoryDB.getCategories().then(data => {
      let ids = findNode(req.body.id, data);
      resolve(ids);
      // categoryDB.deleteCategories(ids).then(res => {
      //   resolve(res);
      // }).catch(error => {
      //   reject('error in deleteCategory: ' + error);
      // });
    }).catch(error => {
      reject('error in deleteCategory: ' + error);
    });
  });
}

function findNode(id, data) {
  let ids = [id];
  findNode2(id);

  function findNode2(id) {
    for(let i = 0; i < data.length; ++i) {
      if(data[i].parentId === id) {
        ids.push(data[i]._id);
        findNode2(data[i]._id);
      }
    }
  }
  return ids;
}

