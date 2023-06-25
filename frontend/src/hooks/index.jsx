import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext.jsx';
import SocketContext from '../contexts/SocketContext.jsx';

const useAuth = () => useContext(AuthContext);

const useSocket = () => useContext(SocketContext);

export { useAuth, useSocket };
