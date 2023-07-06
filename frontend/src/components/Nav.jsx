import { React } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.jsx';
import { appRoutes } from '../routes/routes.js';

const Nav = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href={appRoutes.chatPage()}>{t('header.logo')}</Navbar.Brand>
        {auth.loggedIn ? <Button onClick={auth.logOut}>{t('header.logOut')}</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Nav;
