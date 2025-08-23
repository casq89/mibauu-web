import { useMutation } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { handleError } from '@/utils/requests';
import { toast } from 'react-toastify';
import { createOfferDefatulState } from '@/utils/validation-schema';
import { Offer } from '@/types/Offers';
import { generateFormOfferRequest } from '@/utils/offers';

type Response = {
  data: Offer[];
};

const postOffers = async (offer: typeof createOfferDefatulState) => {
  try {
    const formData = generateFormOfferRequest(offer);
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.post<Response>(
      `/functions/v1/offers`,
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    toast.success('Promoción añadida correctamente');
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const usePostOffers = () => {
  return useMutation({
    mutationKey: ['post_offers'],
    mutationFn: (offer: typeof createOfferDefatulState) => postOffers(offer),
  });
};
