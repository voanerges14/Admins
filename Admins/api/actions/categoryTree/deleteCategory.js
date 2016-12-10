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
  function findNode2(id) {
    for(let category in data) {
      if(category.parentId === id) {
        ids.push(category._id);
        findNode2(category._id);
      }
    }
  }
  return ids;
}

