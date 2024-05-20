// components/NavBar.js
import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import brandName from "./../../assets/try555.png";
import "./NavTop.css"

const links = [
  { to: "/", name: "Home" },
  { to: "/about", name: "About" },
  { to: "/contact", name: "Contact" },
  { to: "/products", name: "Products" },
  { to: "/services", name: "Services" },
  { to: "/gallery", name: "Gallery" },
];
function NavTop() {
  return (
    <Navbar bg="dark" expand="lg" className="font-I">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={brandName} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {links.map((e,i) => (
              <Nav.Link key={i}  as={Link} to={e.to} className="text-center">
                {e.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavTop;
