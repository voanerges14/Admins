/**
 * Created by pavlo on 10.11.16.
 */
import load from './load';

export default function update(req) {
  return new Promise((resolve, reject) => {
    // write to database
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject('Oh no! CategoriesOLD save fails 20% of the time. Try again.');
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
    }, 1500); // simulate async db write
  });
}
