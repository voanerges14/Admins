import * as categoryDB from './../../DbApi/Categories';
import convert from './convert';

export default function deleteCategory(req) {
  return new Promise((resolve, reject) => {
    console.log('id to delete: ' + JSON.stringify(req.body.id));

    categoryDB.getCategories().then(data => {
      let ids = findNode(req.body.id, data);
      console.log('ids: ' + JSON.stringify(ids));
      categoryDB.deleteCategories(ids).then(() => {
          resolve('ok_serv');
      }).catch(error => {
        reject('error in deleteCategory: ' + error);
      });
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
