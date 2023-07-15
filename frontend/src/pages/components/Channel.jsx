import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalSlice.js';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelRef = useRef();
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const lastChannel = (channel.id === activeChannelId) ? channelRef : null;
  const channelVariant = (channel.id === activeChannelId) ? 'secondary' : 'light';

  const handleChannelClick = (id) => {
    dispatch(channelsActions.setActiveChannel(id));
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

  useEffect(() => {
    const activeChannel = document.querySelector('.btn-secondary');
    channelRef.current?.lastElementChild?.scrollIntoView(activeChannel);
  }, []);

  return (
    !channel.removable ? (
      <li key={channel.id} className="nav-item w-100">
        <Button
          onClick={() => handleChannelClick(channel.id)}
          variant={channelVariant}
          className="w-100 rounded-0 text-start"
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      </li>
    ) : (
      <li key={channel.id} className="nav-item w-100" ref={lastChannel}>
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            onClick={() => handleChannelClick(channel.id)}
            variant={channelVariant}
            className="w-100 rounded-0 text-start text-truncate"
          >
            <span className="me-1">{`# ${channel.name}`}</span>
          </Button>
          <Dropdown.Toggle
            variant={channelVariant}
            className="flex-grow-0 dropdown-toggle-split"
          >
            <span className="visually-hidden">{t('chatPage.channelControl')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleRemoveChannelClick(channel.id)}>
              {t('chatPage.remove')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleRenameChannelClick(channel.id, channel.name)}>
              {t('chatPage.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    )
  );
};

export default Channel;
