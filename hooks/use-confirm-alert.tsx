import { AlertBody } from '@/components/alert-body';
import { confirmAlert } from 'react-confirm-alert';

type ConfirmAlertProps = {
  title: string;
  message: string;
  onclick: () => Promise<void>;
};
export const useConfirmAlert = () => {
  const handleConfirmAlert = ({
    title,
    message,
    onclick,
  }: ConfirmAlertProps) => {
    confirmAlert({
      childrenElement: () => <AlertBody title={title} message={message} />,
      buttons: [
        {
          label: 'Si',
          style: {
            backgroundColor: '#FF775C',
            alignSelf: 'center',
          },
          onClick: onclick,
        },
        {
          label: 'No',
        },
      ],
      overlayClassName: 'overlay-custom-class-name',
    });
  };

  return {
    handleConfirmAlert,
  };
};
