import axios from 'axios';
import { useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext.jsx';
import { serverRoutes } from '../routes/routes.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'));
  const [userName, setUserName] = useState(null);

  const logIn = async (logInData) => {
    const { data } = await axios.post(serverRoutes.loginPath(), logInData);
    localStorage.setItem('user', JSON.stringify(data));
    setLoggedIn(true);
    setUserName(data.username);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    setUserName(null);
  };

  const signUp = async (signUpData) => {
    const { data } = await axios.post(serverRoutes.registrationPath(), signUpData);
    localStorage.setItem('user', JSON.stringify(data));
    setLoggedIn(true);
    setUserName(data.username);
  };

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('user'));

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };

  const authMemo = useMemo(() => ({
    loggedIn, signUp, logIn, logOut, getAuthHeader, userName,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={authMemo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
