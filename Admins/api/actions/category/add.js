import * as categoryDB from './../../DbApi/Categories';

export default function update(req) {
  return new Promise((resolve, reject) => {
    console.log('come from ' + JSON.stringify(req.body));
    const parentId = req.body.category.parentId;
    const name = req.body.category.name;
    categoryDB.addCategory({parentId, name, properties: []});
    resolve({_id: 'k9j87h6gf54d3dt5y67u8', name: req.body.category.name, properties: []});

  });
}
