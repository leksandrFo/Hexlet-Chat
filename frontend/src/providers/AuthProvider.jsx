import axios from 'axios';
import { useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext.jsx';
import { serverRoutes } from '../routes/routes.js';

const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);

  const logIn = async (logInData) => {
    const { data } = await axios.post(serverRoutes.loginPath(), logInData);
    localStorage.setItem('user', JSON.stringify(data.username));
    localStorage.setItem('token', JSON.stringify(data.token));
    setUserName(data.username);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUserName(null);
  };

  const signUp = async (signUpData) => {
    const { data } = await axios.post(serverRoutes.registrationPath(), signUpData);
    localStorage.setItem('user', JSON.stringify(data.username));
    localStorage.setItem('token', JSON.stringify(data.token));
    setUserName(data.username);
  };

  const authMemo = useMemo(() => ({
    signUp, logIn, logOut, userName,
  }));

  return (
    <AuthContext.Provider value={authMemo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
