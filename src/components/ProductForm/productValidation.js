import {createValidator, required, isURL} from 'utils/validation';

const urlValidation = createValidator({
  img: [required, isURL]
});
export default urlValidation;
