import { React } from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Nav = () => (
  <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <Container className="container">
      <a className="navbar-brand" href="/login">Hexlet Chat</a>
    </Container>
  </Navbar>
);

export default Nav;
