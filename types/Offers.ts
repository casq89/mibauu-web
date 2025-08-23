export type Offer = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};

export type OfferDefaultState = {
  id: number;
  image: string;
  offerName: string;
  description: string;
  price: number;
  enable: boolean;
};
