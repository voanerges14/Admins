import {createValidator, required, maxLength, oneOf} from 'utils/validation';
export const types = ['string', 'color', 'number'];

const categoriesValidation = createValidator({
  name: [required, maxLength(18)],
  propertyName: [required, maxLength(18)],
  types: [oneOf(types)]
});

export default categoriesValidation;
