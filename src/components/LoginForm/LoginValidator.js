import {createValidator, required, maxLength, minLength, email} from 'utils/validation';

const logInValidation = createValidator({
  email: [required, maxLength(30), email],
  password: [required, minLength(3)],
});
export default logInValidation;
