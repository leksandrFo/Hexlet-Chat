import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import SocketContext from '../contexts/SocketContext.jsx';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  const socket = io();
  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });

  const sendMessage = (message) => {
    socket.emit('newMessage', message);
  };

  const socketMemo = useMemo(() => ({
    sendMessage,
  }), [socket]);

  return (
    <SocketContext.Provider value={socketMemo}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
