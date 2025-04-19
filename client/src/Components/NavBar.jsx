import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from 'react-router-dom';


function NavBar() {
  return (
    <Navbar expand="md" bg="dark" variant="dark" className="bg-gray-800 text-red-300"
    style={{}}>
      <Container className="mx-4">
      <Navbar.Brand href="#home">
            <img
              src={'src/assets/ASHOKLEY.NS-ccd24b88.png'}
              width="50"
              height="2000"
              className="d-inline-block align-top "
              alt="React Bootstrap logo"
            />
            {/* <img
              src={'src/assets/55853709-stack-of-colored-books-the-logo-of-the-bookstore-the-book-icon-bookstore-or-library-the-book-on-the-removebg-preview (1).png'}
              width="50"
              height="50"
              className="d-inline-block align-top "
              alt="React Bootstrap logo"
            /> */}
          </Navbar.Brand>
        <Navbar.Brand href="#"  className="text-blue-200">Customer Testimonial</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav1">
          <Nav.Link as={NavLink} to="/"  className="text-yellow-400"> 
              Home
            </Nav.Link>
          <Nav.Link as={NavLink} to="/dashboard"  className="text-yellow-400">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/create" className="text-yellow-400">
              Upload
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
