import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import ashokleylandLogo from "../assets/ASHOKLEY.NS-ccd24b88.png";

function NavBar() {
  return (
    <Navbar expand="md" bg="dark" variant="dark" className="bg-gray-800">
      <Container fluid className="px-4">
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-2">
          <img
            src={ashokleylandLogo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Ashok Leyland Logo"
          />
          <span className="text-blue-200">Customer Testimonial</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-yellow-400">
            <Nav.Link as={NavLink} to="/" className="text-yellow-400">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/dashboard" className="text-yellow-400">
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
