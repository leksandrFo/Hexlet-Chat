import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import SocketContext from '../contexts/SocketContext.jsx';
import { actions } from '../slices/messagesSlice.js';

const SocketProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(actions.sendMessage(message));
    });
  });

  const sendMessage = useCallback(() => socket.emit('newMessage'));

  return (
    <SocketContext.Provider value={sendMessage}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
