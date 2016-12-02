/**
 * Created by pavlo on 09.11.16.
 */
import * as Db from './../../DbApi/Categories';

const convertation = function (data) {
  let nodes = [], map = {}, node, roots = [];

  for (var i = 0; i < data.length; i += 1) {
    nodes.push({'_id': data[i]._id, 'parentId':data[i].parentId,
      'name': data[i].name, 'properties': data[i].properties, 'children':[]});

    node = nodes[i];
    node.children = [];
    map[node._id] = i; // use map to look-up the parents
    if (node.parentId !== '0') {
      nodes[map[node.parentId]].children.push(node);
      console.log(nodes[map[node.parentId]]);
    } else {
      roots.push(node);
    }
  }
  return roots;
};


export default function load(req) {
  return new Promise((resolve, reject) => {
    Db.getCategories().then(data => {
      // resolve(data);
      resolve(convertation(data));
    }).catch(err => {
      reject('error in load category: ' + err);
    });
  });
}
