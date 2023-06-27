import React from 'react';
import { useSelector } from 'react-redux';
// import cn from 'classnames';
import { selectors as channelsSelector } from '../../slices/channelsSlice.js';
import { selectors } from '../../slices/messagesSlice.js';
import { useAuth } from '../../hooks/index.jsx';
import MessagesForm from './MessagesForm.jsx';

const Messages = () => {
  // const dispatch = useDispatch();
  const auth = useAuth();
  const name = auth.userName;
  const channels = useSelector(channelsSelector.selectAll);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const activeChannel = channels.find(({ id }) => id === activeChannelId);

  const messages = useSelector(selectors.selectAll);
  const activeMessages = messages.filter(({ channelId }) => channelId === activeChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${activeChannel ? activeChannel.name : ''}`}</b>
          </p>
          <span className="text-muted">{`${activeMessages.length} сообщений`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {
            activeMessages.map((message) => {
              const { id, username, body } = message;
              // const messageClass = cn('d-flex flex-wrap text-break mb-2', {
              //   'd-flex flex-wrap text-break mb-2': username === name,
              // });
              const messageStyle1 = {
                background: 'Wheat',
                marginLeft: '20%',
              };
              const messageStyle2 = {
                background: 'LightBlue',
                marginRight: '20%',
              };

              const messageStyle = username === name ? messageStyle1 : messageStyle2;
              return (
                <div key={id} className="d-flex flex-wrap text-break mb-2" style={messageStyle}>
                  <div className="w-100">
                    <b>{`${username}:`}</b>
                  </div>
                  {body}
                </div>
              );
            })
          }
        </div>
        <div className="mt-auto px-5 py-3">
          <MessagesForm activeChannelId={activeChannelId} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
