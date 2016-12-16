export default function convert(data) {
  let nodes = [], map = {}, node, roots = [];
  for (let i = 0; i < data.length; i += 1) {
    nodes.push({'_id': data[i]._id, 'parentId':data[i].parentId,
      'name': data[i].name, 'properties': data[i].properties, 'children':[]});

    node = nodes[i];
    node.children = [];
    map[node._id] = i; // use map to look-up the parents
    if (node.parentId !== '0') {
      nodes[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};