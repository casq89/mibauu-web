import { OfferDefaultState } from '@/types/Offers';
import { createOfferDefatulState } from './validation-schema';

export const generateFormOfferRequest = (
  offer: typeof createOfferDefatulState | OfferDefaultState
) => {
  const formData = new FormData();

  formData.append('image', offer.image);
  formData.append('name', offer.offerName.toString());
  formData.append('description', offer.description);
  formData.append('price', offer.price.toString());
  formData.append('enable', offer.enable ? 'true' : 'false');

  return formData;
};
