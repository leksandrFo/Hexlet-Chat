import { React } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { appRoutes } from '../routes/routes.js';
import { useAuth } from '../hooks/index.jsx';

const Nav = () => {
  const auth = useAuth();
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href={appRoutes.chatPage()}>Hexlet Chat</Navbar.Brand>
        {auth.loggedIn ? <Button onClick={auth.logOut}>Выйти</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Nav;
