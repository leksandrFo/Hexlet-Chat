import 'react-toastify/dist/ReactToastify.css';
import {
  useLocation,
  Navigate,
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import leoProfanity from 'leo-profanity';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';
import AuthProvider from './providers/AuthProvider.jsx';
import SocketProvider from './providers/SocketProvider.jsx';
import I18nProvider from './providers/I18nextProvider.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import Nav from './pages/components/Nav.jsx';
import { appRoutes } from './routes/routes.js';
import { useAuth } from './hooks/index.jsx';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to={appRoutes.loginPage()} state={{ from: location }} />
  );
};

leoProfanity.add(leoProfanity.getDictionary('ru'), leoProfanity.getDictionary('en'));

const App = () => (
  <div className="d-flex flex-column h-100">
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
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
              <ToastContainer />
            </SocketProvider>
          </AuthProvider>
        </I18nProvider>
      </ErrorBoundary>
    </Provider>
  </div>
);

export default App;
