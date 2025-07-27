export type Product = {
  id: number;
  code: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
  promotion: boolean;
  disccount: number;
  imagen_url: string;
  category: {
    name: string;
  };
  enable: boolean;
};
