import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsPlusSquare } from 'react-icons/bs';
import cn from 'classnames';
import { fetchChannels, selectors, setActiveChannel } from '../../slices/channelsSlice.js';
import { useAuth } from '../../hooks/index.jsx';

const Channels = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    dispatch(fetchChannels(auth.getAuthToken()));
  }, [dispatch]);

  const channels = useSelector(selectors.selectAll);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);

  const handleClick = (id) => {
    dispatch(setActiveChannel(id));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <BsPlusSquare viewBox="0 0 16 16" fill="currentColor" size="20" />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {
          channels.map(({ id, name }) => {
            const channelClass = cn('w-100 rounded-0 text-start btn', {
              'btn-secondary': id === activeChannelId,
            });

            return (
              <li key={id} className="nav-item w-100">
                <button
                  type="button"
                  className={channelClass}
                  onClick={() => handleClick(id)}
                >
                  <span className="me-1">#</span>
                  {name}
                </button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Channels;
