// components/Home.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import SmallFooter from "./SmallFooter";
import "./Home.css";
function GetInTouch() {
  return (
    <Button
      variant="primary"
      className="mt-3 font-I hstack left-on-touch"
      as={Link}
      to="/contact"
    >
      <span>Get in Touch</span>
      <FaAngleRight size={"2em"} />
    </Button>
  );
}
function GetInTouch2() {
  return (
    <button
      className=" btn-glass border-0 py-2 rounded-3 font-I h5 mb-0 d-center hstack"
      as={Link}
      to="/contact"
    >
      <span>Get in<br/> Touch</span>
      <FaAngleRight size={"4em"} />
    </button>
  );
}
function Home() {
  return (
    <div className="vstack h-100 justify-content-between home-container text-center">
      <div className="top nothing"></div>
      <div className="hstack text-start px-2 px-md-4">
        <div className="">
          <h1>We help you turn your vision to reality</h1>
          <p className="lead">
            Transform your final year with our expert project-building services.
            We specialize in crafting custom projects that align with your
            academic goals, ensuring you stand out and succeed. Let us take the
            stress out of your final year and help you achieve excellence.
          </p>
          <div className="hstack">
            <div className="discover font-I vstack">
              <div>
                <Button
                  variant="secondary"
                  className="mt-3"
                  as={Link}
                  to="/about/team"
                >
                  Team
                  <FaAngleRight size={"12px"} />
                </Button>{" "}
              </div>
              <div>
                <Button
                  variant="secondary"
                  className="mt-3"
                  as={Link}
                  to="/about"
                >
                  Journey
                  <FaAngleRight size={"12px"} />
                </Button>
              </div>
            </div>
            <div className="d-sm-none me-2">
              <GetInTouch2/>
            </div>
          </div>
        </div>
        <div className="d-none d-sm-flex"><GetInTouch/></div>
      </div>

      <SmallFooter />
    </div>
  );
}
export default Home;
