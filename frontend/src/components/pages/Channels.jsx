import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { BsPlusSquare } from 'react-icons/bs';
import { fetchChannels, selectors, actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalSlice.js';
import { useAuth } from '../../hooks/index.jsx';

const Channels = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    dispatch(fetchChannels(auth.getAuthToken()));
  }, [dispatch]);

  const channels = useSelector(selectors.selectAll);
  // console.log(channels);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  // console.log('activeChannelId', activeChannelId);

  const handleChannelClick = (id) => {
    dispatch(channelsActions.setActiveChannel(id));
  };

  const handleAddChannelClick = () => {
    dispatch(modalsActions.showModal({ operation: 'addChannel' }));
  };

  const handleRemoveChannelClick = (id) => {
    dispatch(modalsActions.showModal({
      operation: 'removeChannel',
      channelData: {
        id,
      },
    }));
  };

  const handleRenameChannelClick = (id, name) => {
    dispatch(modalsActions.showModal({
      operation: 'renameChannel',
      channelData: {
        id,
        name,
      },
    }));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          variant="light"
          onClick={handleAddChannelClick}
          className="p-0 text-primary btn-group-vertical"
        >
          <BsPlusSquare viewBox="0 0 16 16" fill="currentColor" size="20" />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {
          channels.map(({ id, name, removable }) => {
            const channelVariant = (id === activeChannelId) ? 'secondary' : 'light';

            return (
              !removable ? (
                <li key={id} className="nav-item w-100">
                  <Button
                    onClick={() => handleChannelClick(id)}
                    variant={channelVariant}
                    className="w-100 rounded-0 text-start"
                  >
                    <span className="me-1">#</span>
                    {name}
                  </Button>
                </li>
              ) : (
                <li key={id} className="nav-item w-100">
                  <Dropdown as={ButtonGroup} className="d-flex">
                    <Button
                      onClick={() => handleChannelClick(id)}
                      variant={channelVariant}
                      className="w-100 rounded-0 text-start text-truncate"
                    >
                      <span className="me-1">{`# ${name}`}</span>
                    </Button>
                    <Dropdown.Toggle
                      variant={channelVariant}
                      className="flex-grow-0 dropdown-toggle-split"
                    >
                      <span className="visually-hidden">Управление каналом</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleRemoveChannelClick(id)}>
                        Удалить
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleRenameChannelClick(id, name)}>
                        Переименовать
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              )
            );
          })
        }
      </ul>
    </div>
  );
};

export default Channels;
