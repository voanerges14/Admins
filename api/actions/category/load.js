import * as CategoriesDb from './../../DbApi/Categories';
import convert from './convert';

export default function load() {
  return new Promise((resolve) => {
    CategoriesDb.getCategories().then(data => {
      resolve(convert(data));
    });
  });
}
