import {
  useLocation,
  Navigate,
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import AuthProvider from './providers/AuthProvider.jsx';
import SocketProvider from './providers/SocketProvider.jsx';
import NotFoundPage from './components/pages/NotFoundPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import RegistrationPage from './components/pages/RegistrationPage.jsx';
import ChatPage from './components/pages/ChatPage.jsx';
import Nav from './components/Nav.jsx';
import { useAuth } from './hooks/index.jsx';

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
      <SocketProvider>
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
            <Route path="/signup" element={<RegistrationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  </div>
);

export default App;
