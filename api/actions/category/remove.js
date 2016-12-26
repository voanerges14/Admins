import * as categoryDB from './../../DbApi/Categories';

function findChildren(id, data) {
  const children = [];
  for (let index = 0; index < data.length; ++index) {
    if (data[index].parentId.toString() === id.toString()) {
      const temp = data[index]._id;
      children.push(temp);
    }
  }
  return children;
}
function findNode(id, data) {
  const ids = [];
  function findNodeRec(_id, _data) {
    ids.push(_id);
    const children = findChildren(_id, _data);
    for (let index = 0; index < children.length; ++index) {
      findNodeRec(children[index], _data);
    }
  }
  findNodeRec(id, data);
  return ids;
}

export default function deleteCategory(req) {
  return new Promise((resolve, reject) => {
    categoryDB.getCategories().then(data => {
      const ids = findNode(req.body.id, data);
      categoryDB.deleteCategories(ids).then(() => {
        resolve('Ok');
      });
    }).catch(error => {
      reject('error in deleteCategory: ' + error);
    });
  });
}
