import * as Yup from 'yup';

const emailValidation = Yup.string()
  .required('Correo electrónico es obligatorio')
  .email('El formato debe ser email');

export const loginDefaultState = {
  email: '',
  password: '',
};

export const loginValidationSchema = Yup.object({
  email: emailValidation,
  password: Yup.string().required('La contraseña es obligatoria'),
});
