import {
  useLocation,
  Navigate,
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import AuthProvider from './providers/AuthProvider.jsx';
import SocketProvider from './providers/SocketProvider.jsx';
import I18nProvider from './providers/I18nextProvider.jsx';
import NotFoundPage from './components/pages/NotFoundPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import RegistrationPage from './components/pages/RegistrationPage.jsx';
import ChatPage from './components/pages/ChatPage.jsx';
import Nav from './components/Nav.jsx';
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
    <I18nProvider>
      <AuthProvider>
        <SocketProvider>
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
              <Route path={appRoutes.notFoundPage()} element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </SocketProvider>
      </AuthProvider>
    </I18nProvider>
  </div>
);

export default App;
