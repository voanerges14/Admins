import * as CategoriesDb from './../../DbApi/Categories';
import convert from './convert';

export default function load() {
  return new Promise((resolve, reject) => {
    CategoriesDb.getCategories().then(data => {
      resolve(convert(data));
    }).then(error => {
      reject(error);
    });
  });
}
