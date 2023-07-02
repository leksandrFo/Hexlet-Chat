import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import SocketContext from '../contexts/SocketContext.jsx';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  const socket = io();
  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    dispatch(channelsActions.addChannel(channel));
  });
  socket.on('removeChannel', (channel) => {
    dispatch(channelsActions.removeChannel(channel));
  });
  socket.on('renameChannel', (channel) => {
    dispatch(channelsActions.renameChannel(channel));
  });

  const sendMessage = (message) => {
    socket.emit('newMessage', message);
  };

  const createChannel = (channel) => {
    socket.emit('newChannel', channel, ({ data }) => {
      dispatch(channelsActions.setActiveChannel((data.id)));
    });
  };

  const removeChannel = (channel) => {
    socket.emit('removeChannel', channel);
  };

  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel);
  };

  const socketMemo = useMemo(() => ({
    sendMessage, createChannel, removeChannel, renameChannel,
  }), [socket]);

  return (
    <SocketContext.Provider value={socketMemo}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
