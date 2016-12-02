/**
 * Created by pavlo on 09.11.16.
 */
import * as Db from './../../DbApi/Categories';

const initialCategories = [
  {id: 1, name: 'Laptop1',  property: [
    {name: 'color'},
    {name: 'some'},
    {name: 'some1'},
    {name: 'some2'},
    {name: 'some3'}
  ],},
  {id: 2, name: 'Laptop2',  property: [
    {name: 'color'},
    {name: 'some'},
    {name: 'some1'},
    {name: 'some2'},
    {name: 'some3'}
  ],},
  {id: 3, name: 'Laptop3', property: [
    {name: 'color'},
    {name: 'some'},
    {name: 'some1'},
    {name: 'some2'},
    {name: 'some3'}
  ],},
  {id: 4, name: 'Laptop4',  property: [
    {name: 'color'},
    {name: 'some'},
    {name: 'some1'},
    {name: 'some2'},
    {name: 'some3'}
  ],},
  {id: 5, name: 'Laptop5',  property: [
    {name: 'color'},
    {name: 'some'},
    {name: 'some1'},
    {name: 'some2'},
    {name: 'some3'}
  ],},
];

export function getCategories(req) {
  let categories = req.session.categories;
  if (!categories) {
    categories = initialCategories;
    req.session.categories = categories;
  }
  return categories;
}

export default function load(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
    // setTimeout(() => {
      try {
        // resolve(getCategories(req));
        Db.getCategories().then(data => {
          console.log('fdfsd' + data);
          resolve(data);
        });
      } catch(e) {
        reject('CategoriesOLD load fails 33% of the time. You were unlucky.');
      }
    // }, 1000); // simulate async load
  });
}
