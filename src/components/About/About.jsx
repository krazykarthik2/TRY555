import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import SmallFooter from "./../Home/SmallFooter";
function About() {
  return (
    <div className="h-100 text-start  d-flex flex-column justify-content-between about-container px-21">
      <h1>
        At try555, we specialize in crafting custom projects tailored to your
        unique requirements.
      </h1>
      <p className="lead mt-3 ">
        Whether your project involves electronics, art, or a combination of
        both, our skilled team brings your vision to life with precision and
        creativity. We transform your ideas into impressive final year projects
        that meet academic standards and stand out. Trust us to deliver
        excellence, no matter the discipline.
      </p>

      <Link
        className="font-I d-flex text-color text-decoration-none"
        to={"/about/team"}
      >
        <h2>Men behind try555</h2>
        <FaAngleRight size={"2em"} />
      </Link>
      <Link
        className="font-I d-flex text-color text-decoration-none"
        to={"/about/more"}
      >
        <h2>Learn More</h2>
        <FaAngleRight size={"2em"} />
      </Link>

      <SmallFooter />
    </div>
  );
}

export default About;
