import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import SocketContext from '../contexts/SocketContext.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

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
