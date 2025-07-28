import { CardProductProps } from '@/types/products';
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

export const productDefaultState = ({
  id,
  code,
  productName,
  description,
  price,
  stock,
  promotion,
  disccount = 0,
  enable,
  imagen_url,
  category_id,
}: CardProductProps) => {
  return {
    id,
    code,
    productName,
    description,
    price,
    stock,
    promotion,
    disccount: disccount ?? 0,
    enable,
    imagen_url,
    category_id: String(category_id),
  };
};

export const productValidationSchema = Yup.object({
  id: Yup.number(),
  code: Yup.number(),
  productName: Yup.string(),
  description: Yup.string(),
  price: Yup.number(),
  stock: Yup.number(),
  promotion: Yup.boolean(),
  disccoiunt: Yup.number(),
  enable: Yup.boolean(),
  image_url: Yup.string(),
  category_id: Yup.number(),
});
