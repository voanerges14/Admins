import * as CategoriesDb from './../../DbApi/Categories';
import convert from './convert';

export default function load(req) {
  return new Promise((resolve, reject) => {
    CategoriesDb.getCategories().then(data => {
      resolve(convert(data));
      console.console.log(JSON.stringify(convert(data), null, 4));
    });
  });
}
