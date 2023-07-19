import 'react-toastify/dist/ReactToastify.css';
import {
  useLocation,
  Navigate,
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './providers/AuthProvider.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import Nav from './pages/components/Nav.jsx';
import { appRoutes } from './routes/routes.js';
import { useAuth } from './hooks/index.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to={appRoutes.loginPage()} state={{ from: location }} />
  );
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route
            path={appRoutes.chatPage()}
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
          <Route path={appRoutes.loginPage()} element={<LoginPage />} />
          <Route path={appRoutes.registrationPage()} element={<RegistrationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  </div>
);

export default App;
