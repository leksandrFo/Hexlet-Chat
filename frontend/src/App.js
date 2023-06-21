import { useState, useMemo } from 'react';
import {
  useLocation, Navigate, BrowserRouter, Routes, Route,
} from 'react-router-dom';
import AuthContext from './contexts/index.jsx';
import NotFoundPage from './components/pages/NotFoundPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import ChatPage from './components/pages/ChatPage.jsx';
import Nav from './components/Nav.jsx';
import useAuth from './hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const getAuthToken = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      return { Authorization: userId.token };
    }

    return {};
  };

  const memoizedValue = useMemo(() => ({
    loggedIn, logIn, logOut, getAuthToken,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </div>
);

export default App;
