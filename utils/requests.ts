import axios from 'axios';
import { toast } from 'react-toastify';

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    toast.error(error?.response?.data.error || 'Ha ocurrido un error');
    return false;
  }
  toast.error('Ha ocurrido un error');
  return false;
};
