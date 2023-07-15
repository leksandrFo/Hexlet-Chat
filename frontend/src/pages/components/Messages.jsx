import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Message from './Message.jsx';
import { selectors as channelsSelector } from '../../slices/channelsSlice.js';
import { selectors } from '../../slices/messagesSlice.js';
import MessagesForm from './MessagesForm.jsx';

const Messages = () => {
  const lastMessage = useRef();
  const { t } = useTranslation();
  const channels = useSelector(channelsSelector.selectAll);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const activeChannel = channels.find(({ id }) => id === activeChannelId);
  const messages = useSelector(selectors.selectAll);
  const activeMessages = messages.filter(({ channelId }) => channelId === activeChannelId);

  useEffect(() => {
    lastMessage.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [activeMessages.length]);

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
          {activeMessages?.map((message) => (
            <Message
              key={message.id}
              message={message}
            />
          ))}
          <span ref={lastMessage} />
        </div>
        <div className="mt-auto px-5 py-3">
          <MessagesForm activeChannelId={activeChannelId} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
