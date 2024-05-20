import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import SmallFooter from "./../Home/SmallFooter";
function About() {
  return (
    <div className="h-100 d-flex flex-column justify-content-between about-container text-center">
      <h1>
        At try555, we specialize in crafting custom projects tailored to your
        unique requirements.
      </h1>
      <p className="lead mt-3">
        Whether your project involves electronics, art, or a combination of
        both, our skilled team brings your vision to life with precision and
        creativity. We transform your ideas into impressive final year projects
        that meet academic standards and stand out. Trust us to deliver
        excellence, no matter the discipline.
      </p>

      <Link className="d-flex text-color text-decoration-none" to={"/about/team"}>
        <h2>Men behind try555</h2>
        <FaAngleRight size={"2em"} />
      </Link>
      <div>
        <Button
          variant="secondary"
          className="mt-3 d-inline "
          as={Link}
          to="/about/more"
        >
          Learn More <FaAngleRight />
        </Button>
      </div>

      <SmallFooter />
    </div>
  );
}

export default About;
