import {
  CardProductProps,
  Product,
  ProductDefaultState,
} from '@/types/products';
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
}: CardProductProps): ProductDefaultState => {
  return {
    id,
    image: '',
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
  image: Yup.string().nullable(),
  code: Yup.number(),
  productName: Yup.string(),
  description: Yup.string(),
  price: Yup.number(),
  stock: Yup.number(),
  promotion: Yup.boolean(),
  disccount: Yup.number(),
  enable: Yup.boolean(),
  image_url: Yup.string(),
  category_id: Yup.number(),
});

export const createProductValidationSchema = Yup.object({
  code: Yup.number().required(),
  image: Yup.string().nullable(),
  productName: Yup.string().required('El nombre del producto es requerido'),
  description: Yup.string().required('La descripción es requerida'),
  price: Yup.number().required('El precio es requerido'),
  stock: Yup.number().required('La cantidad es requerida'),
  promotion: Yup.boolean(),
  disccount: Yup.number(),
  enable: Yup.boolean().required(),
  category_id: Yup.number().required('La categoría es requerida'),
});

export const createProductDefaultState = {
  code: '',
  image: '',
  productName: '',
  description: '',
  price: '',
  stock: '',
  promotion: false,
  disccount: '',
  enable: true,
  category_id: '',
};

export const createCategoryValidationSchema = Yup.object({
  id: Yup.number(),
  categoryName: Yup.string(),
  description: Yup.string(),
  enable: Yup.string(),
});

export const createCategoryDefatulState = {
  id: '',
  categoryName: '',
  description: '',
  enable: 'true',
};

export const createOfferValidationSchema = Yup.object({
  id: Yup.number(),
  offerName: Yup.string(),
  description: Yup.string(),
  enable: Yup.string(),
  image: Yup.string(),
  price: Yup.number(),
});

export const createOfferDefatulState = {
  id: '',
  offerName: '',
  description: '',
  image: '',
  price: 0,
  enable: 'true',
};
