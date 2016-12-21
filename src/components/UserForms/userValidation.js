import {createValidator, required, maxLength, minLength, mobile, email} from 'utils/validation';

const userValidation = createValidator({
  firstName: [required, maxLength(18)],
  lastName: [required, maxLength(18)],
  email: [required, maxLength(30), email],
  password: [required, minLength(3)],
  phone: [mobile, maxLength(20)]
});
export default userValidation;
