import { useMutation } from '@tanstack/react-query';
import { miBauuClient } from '../common/serviceBase';
import { handleError } from '@/utils/requests';
import { toast } from 'react-toastify';

type Response = {
  data: { success: boolean };
};

const deleteOffers = async (id: number) => {
  try {
    const token = await localStorage.getItem('token');
    const response = await miBauuClient.delete<Response>(
      `/functions/v1/offers/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    toast.success('Promoción eliminada correctamente');
    return response.data.data;
  } catch (error) {
    handleError(error);
    return { success: false };
  }
};

export const useDeleteOffers = () => {
  return useMutation({
    mutationKey: ['delete_offers'],
    mutationFn: (id: number) => deleteOffers(id),
  });
};
