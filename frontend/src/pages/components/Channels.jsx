import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { BsPlusSquare } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import Channel from './Channel.jsx';
import { fetchChannels, selectors } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const getHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }

    return {};
  };

  useEffect(() => {
    dispatch(fetchChannels(getHeader()));
  }, [dispatch]);

  const channels = useSelector(selectors.selectAll);

  const handleAddChannelClick = () => {
    dispatch(modalsActions.showModal({ operation: 'addChannel' }));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chatPage.channels')}</b>
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
        {channels?.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
          />
        ))}
      </ul>
    </div>
  );
};

export default Channels;
