export type Category = {
  id?: string;
  name: string;
  description: string;
  enable: boolean;
  image_url?: string;
  image?: File | string;
};

export type CategoryDefaultState = {
  id?: string;
  name?: string;
  description?: string;
  enable?: boolean;
  image?: File | string;
};
