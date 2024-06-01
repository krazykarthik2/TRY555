// components/NavBar.js
import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import brandName from "./../../assets/try555.png";
import "./NavTop.css";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const links = [
  { to: "/", name: "Home" },
  { to: "/about", name: "About" },
  { to: "/contact", name: "Contact" },
  { to: "/products", name: "Products" },
  { to: "/services", name: "Services" },
  { to: "/gallery", name: "Gallery" },
];
const sequence = [
  "logo",
  "logo",
  "logo",
  "home",
  "about",
  "contact",
  "contact",
  "contact",
  "about",
  "about",
  "home",
  "home",
  "home",
];
const timeLim = 15 * 1000;
function NavTop() {
  const [seq, setSeq] = useState([]);
  const navigate = useNavigate();
  function trySeq(x) {
    setSeq((e) => [...e, { n: x, t: Date.now() }]);
  }
  useEffect(() => {
    if (
      seq.findIndex((e) => e.t <= Date.now() - timeLim) != -1 ||
      seq.length > sequence.length
    )
      setSeq(
        seq
          .sort((a, b) => b.t - a.t)
          .filter((e, i) => i < sequence.length && e.t > Date.now() - timeLim)
          .sort((a, b) => a.t - b.t)
      );
    else {
      let x = seq.reverse().sort((a, b) => a.t - b.t),
        y = sequence.reverse(),
        flag = true;
      for (let i in x) {
        try {
          if (x[i].n != y[i]) {
            flag = false;
            break;
          }
        } catch (error) {
          console.log(error)
          flag = false;
          break;
        }
      }
      if (flag == true) navigate("/admin");
    }
  }, [seq]);

  return (
    <>
      <Navbar bg="dark" expand="lg" className="font-I">
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={() => trySeq("logo")}>
            <img src={brandName} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {links.map((e, i) => (
                <Nav.Link
                  key={i}
                  as={Link}
                  to={e.to}
                  className="text-center"
                  onClick={() => trySeq(e.name.toLowerCase())}
                >
                  {e.name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <br />
      </Navbar>
      
    </>
  );
}

export default NavTop;
