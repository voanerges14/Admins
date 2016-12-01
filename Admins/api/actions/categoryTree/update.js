import load from './load';

export default function update(req) {
  return new Promise((resolve, reject) => {
    // write to database
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject('Oh no! Categories save fails 20% of the time. Try again.');
      } else {
        load(req).then(data => {
          const categories = data;
          const category= req.body;
          if (category.id) {
            categories[category.id - 1] = category;  // id is 1-based. please don't code like this in production! :-)
            req.session.categories = categories;
          }
          resolve(category);
        }, err => {
          reject(err);
        });
      }
    }, 10000); // simulate async db write
  });
}
