import * as categoryDB from './../../DbApi/Categories';

export default function update(req) {
  return new Promise((resolve, reject) => {
    // categoryDB.
    console.log('come from ' + JSON.stringify(req.body));
    resolve({_id:'k9j87h6gf54d3dt5y67u8', name: req.body.name, properties: []});

  });
}
