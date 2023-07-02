import {
  ModalHeader, ModalTitle, ModalBody, Button,
} from 'react-bootstrap';
import { useSocket } from '../../hooks/index.jsx';
// import { actions } from '../../slices/modalSlice.js';

const RemoveChannelModal = ({ handleClose, channelData }) => {
  const socket = useSocket();
  console.log('remove');
  // console.log(id);

  const handleSubmit = () => {
    socket.removeChannel(channelData);
    handleClose();
  };

  return (
    <div className="modal-content">
      <ModalHeader closeButton>
        <ModalTitle className="modal-title h4">
          Удалить канал
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="modal-body">
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button
            onClick={handleClose}
            variant="secondary"
            className="me-2"
          >
            Отменить
          </Button>
          <Button
            onClick={handleSubmit}
            variant="danger"
          >
            Удалить
          </Button>
        </div>
      </ModalBody>
    </div>
  );
};

export default RemoveChannelModal;
