function localDeleteEmptyArray(data) {
  for (let index = 0; index < data.length; ++index) {
    const children = data[index].children;
    localDeleteEmptyArray(children);
    if (children.length <= 0) {
      data[index] = {
        '_id': data[index]._id,
        'parentId': data[index].parentId,
        'name': data[index].name,
        'properties': data[index].properties
      };
    }
  }
}

export default function convert(data) {
  const nodes = [];
  const map = {};
  let node;
  const roots = [];
  for (let index = 0; index < data.length; index += 1) {
    nodes.push({'_id': data[index]._id, 'parentId': data[index].parentId,
      'name': data[index].name, 'properties': data[index].properties});

    node = nodes[index];
    node.children = [];
    map[node._id] = index; // use map to look-up the parents
    if (node.parentId !== '0') {
      nodes[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  localDeleteEmptyArray(roots);
  return roots;
}
