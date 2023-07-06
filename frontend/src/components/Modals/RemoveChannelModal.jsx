import {
  ModalHeader, ModalTitle, ModalBody, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';

const RemoveChannelModal = ({ handleClose, channelData }) => {
  const socket = useSocket();
  const { t } = useTranslation();

  const handleSubmit = async () => {
    try {
      await socket.removeChannel(channelData);
      handleClose();
      toast.success(t('modals.remove.success'));
    } catch (error) {
      toast.error(t('errors.network'));
    }
  };

  return (
    <div className="modal-content">
      <ModalHeader closeButton>
        <ModalTitle className="modal-title h4">
          {t('modals.remove.removeChannel')}
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="modal-body">
        <p className="lead">{t('modals.remove.removeMessage')}</p>
        <div className="d-flex justify-content-end">
          <Button
            onClick={handleClose}
            variant="secondary"
            className="me-2"
          >
            {t('modals.remove.cancel')}
          </Button>
          <Button
            onClick={handleSubmit}
            variant="danger"
          >
            {t('modals.remove.remove')}
          </Button>
        </div>
      </ModalBody>
    </div>
  );
};

export default RemoveChannelModal;
