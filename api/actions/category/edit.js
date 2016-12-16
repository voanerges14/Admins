import * as categoryDB from './../../DbApi/Categories';

export default function update(req) {
  return new Promise((resolve, reject) => {
  console.log('come from ' + JSON.stringify(req.body));

  });
}
