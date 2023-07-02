import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../slices/modalSlice.js';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';

const Modals = () => {
  const dispatch = useDispatch();
  const operation = useSelector((state) => state.modal.operation);
  const isOpened = useSelector((state) => state.modal.isOpened);
  const channelData = useSelector((state) => state.modal.channelData);
  console.log(operation, isOpened, channelData);
  // console.log(channelData);

  const modalMapping = {
    addChannel: AddChannelModal,
    removeChannel: RemoveChannelModal,
    renameChannel: RenameChannelModal,
  };

  const ChildrenModal = modalMapping[operation];

  const handleClose = () => dispatch(actions.closeModal());

  return (
    <Modal show={isOpened} centered onHide={handleClose}>
      {ChildrenModal && <ChildrenModal channelData={channelData} handleClose={handleClose} />}
    </Modal>
  );
};

export default Modals;
