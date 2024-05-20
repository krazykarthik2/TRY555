// components/Home.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import SmallFooter from "./SmallFooter";
function Home() {
  return (
    <div className="vstack h-100 justify-content-between home-container text-center">
      <div className="top nothing"></div>
      <div className="hstack text-start">
        <div className="ms-5">
          <h1>We help you turn your vision to reality</h1>
          <p className="lead">
            Transform your final year with our expert project-building services.
            We specialize in crafting custom projects that align with your
            academic goals, ensuring you stand out and succeed. Let us take the
            stress out of your final year and help you achieve excellence.
          </p>
          <div className="discover">
            <Button variant="secondary" className="mt-3" as={Link} to="/about">
              Discover us <FaAngleRight size={"12px"} />
            </Button>
          </div>
        </div>
        <div colSpan={2}>
          <Button variant="primary" className="mt-3" as={Link} to="/contact">
            GET IN TOUCH <FaAngleRight size={"12px"} />
          </Button>
        </div>
      </div>

      <SmallFooter />
    </div>
  );
}
export default Home;
