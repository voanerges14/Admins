import {createValidator, required, maxLength, isURL, integer} from 'utils/validation';

const productsValidation = createValidator({
  name: [required, maxLength(18)],
  inStock: [required, maxLength(18), integer],
  price: [required, maxLength(18), integer],
  images: [required, isURL]
});

export default productsValidation;
