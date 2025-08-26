import { useMutation } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { handleError } from '@/utils/requests';
import { toast } from 'react-toastify';
import { Offer, OfferDefaultState } from '@/types/Offers';
import { generateFormOfferRequest } from '@/utils/offers';

type Response = {
  data: Offer[];
};

const putOffers = async ({ id, ...restOffer }: OfferDefaultState) => {
  try {
    const formData = generateFormOfferRequest({ id, ...restOffer });
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.put<Response>(
      `/functions/v1/offers/${id}`,
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

export const usePutOffers = () => {
  return useMutation({
    mutationKey: ['put_offers'],
    mutationFn: (offer: OfferDefaultState) => putOffers(offer),
  });
};
