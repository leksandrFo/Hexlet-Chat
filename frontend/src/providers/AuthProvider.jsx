import { useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const getUserName = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.username;
  };

  const getAuthToken = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };

  const authMemo = useMemo(() => ({
    loggedIn, logIn, logOut, getAuthToken, getUserName,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={authMemo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
