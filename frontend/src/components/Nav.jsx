import { React } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useAuth } from '../hooks/index.jsx';

const Nav = () => {
  const auth = useAuth();

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container className="container">
        <a className="navbar-brand" href="/login">Hexlet Chat</a>
        {auth.loggedIn ? <Button onClick={auth.logOut}>Выйти</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Nav;
