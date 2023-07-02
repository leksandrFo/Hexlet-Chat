import axios from 'axios';
import { useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext.jsx';
import { serverRoutes } from '../routes/routes.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setLoggedIn(true);
    setUserName(data.username);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    setUserName(null);
  };

  const signUp = async (userData) => {
    const { data } = await axios.post(serverRoutes.registrationPath(), userData);
    logIn(data);
  };

  const getAuthToken = () => {
    const userId = JSON.parse(localStorage.getItem('user'));

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };

  const authMemo = useMemo(() => ({
    loggedIn, signUp, logIn, logOut, getAuthToken, userName,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={authMemo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
