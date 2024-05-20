import React from "react";
import { Card } from "react-bootstrap";
import { FaTools, FaPaintBrush, FaMicrochip } from "react-icons/fa";
import "./Services.css"; // Import custom CSS for additional styling

function Services() {
  return (
    <div className="d-flex flex-column align-items-center text-center services-container">
      <div className="my-5">
        <h1>Our Services</h1>
        <p className="lead mt-3">
          At try555, we offer a wide range of services to bring your projects to life. Our team of experts is dedicated to delivering excellence in every project, ensuring you achieve your academic and professional goals.
        </p>
      </div>
      <div className="d-flex flex-wrap justify-content-center my-5">
        <div className="service-card-container ">
          <Card className="service-card h-100">
            <Card.Body className="vstack justify-content-between align-items-center">
              <FaMicrochip className="service-icon" />
              <Card.Title>Electronics Projects</Card.Title>
              <Card.Text>
                From circuit design to prototype development, we handle all aspects of electronics projects with precision and expertise.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="service-card-container">
          <Card className="service-card h-100">
            <Card.Body className="vstack justify-content-between align-items-center">
              <FaPaintBrush className="service-icon" />
              <Card.Title>Art & Design Projects</Card.Title>
              <Card.Text>
                Our creative team excels in art and design projects, bringing your artistic vision to life with innovative solutions.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="service-card-container">
          <Card className="service-card h-100">
            <Card.Body className="vstack justify-content-between align-items-center">
              <FaTools className="service-icon" />
              <Card.Title>Custom Project Development</Card.Title>
              <Card.Text>
                Tailored to your unique requirements, our custom project development services ensure your ideas are transformed into reality.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Services;
