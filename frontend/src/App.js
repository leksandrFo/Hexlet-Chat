import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './components/pages/NotFoundPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import Nav from './components/Nav.jsx';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Nav />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
