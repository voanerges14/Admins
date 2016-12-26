import * as categoryDB from './../../DbApi/Categories';
import convert from './convert';

export default function deleteCategory(req) {
  return new Promise((resolve, reject) => {

    categoryDB.getCategories().then(data => {
      let ids = findNode(req.body.id, data);
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
  let ids = [];
  findNodeRec(id, data);

  function findNodeRec(id, data) {
    ids.push(id);
    const children = findChildren(id, data);
    for (let i = 0; i < children.length; ++i) {
      findNodeRec(children[i], data);
    }
  }
  return ids;
}

function findChildren(id, data) {
  let children = [];
  for (let i = 0; i < data.length; ++i) {
    if (data[i].parentId == id) {
      const temp = data[i]._id;
      children.push(temp);
    }
  }
  return children;
}
