import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelector } from '../../slices/channelsSlice.js';
import { selectors } from '../../slices/messagesSlice.js';
import { useAuth } from '../../hooks/index.jsx';
import MessagesForm from './MessagesForm.jsx';

const Messages = () => {
  const auth = useAuth();
  const { t } = useTranslation();
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
          <span className="text-muted">
            {t('chatPage.counter.count', { count: activeMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {
            activeMessages.map((message) => {
              const { id, username, body } = message;
              const messageClass = cn('message text-break mb-2', {
                received: username !== name,
                sent: username === name,
              });

              return (
                <div key={id} className={messageClass}>
                  <div className="message-content d-flex flex-column">
                    <span className="message-arrow" />
                    <b>{`${username}:`}</b>
                    {body}
                  </div>
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
