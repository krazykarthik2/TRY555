import React from "react";
import "./Gallery.css"; // Import custom CSS for additional styling
import { Button, Card } from "react-bootstrap";
import { FaShareNodes } from "react-icons/fa6";

const images = [
  { src: "https://via.placeholder.com/300", title: "Artwork 1" },
  { src: "https://via.placeholder.com/300", title: "Artwork 2" },
  { src: "https://via.placeholder.com/300", title: "Artwork 3" },
  { src: "https://via.placeholder.com/300", title: "Artwork 4" },
  { src: "https://via.placeholder.com/300", title: "Artwork 5" },
  { src: "https://via.placeholder.com/300", title: "Artwork 6" },
];

function Gallery() {
  return (
    <div className="d-flex flex-column align-items-center text-center gallery-container">
      <div className="my-5">
        <h1>Modern Gallery</h1>
        <p className="lead mt-3">
          Explore our collection of modern and artistic works, crafted to
          inspire and captivate. Each piece is a testament to creativity and
          innovation.
        </p>
      </div>
      <div className="d-flex flex-wrap justify-content-center my-5">
        {images.map((image, index) => (
          <div className="gallery-card-container" key={index}>
            <Card className="gallery-card rounded-5 p-2">
              <Card.Img
                variant="top rounded-5"
                src={image.src}
                alt={image.title}
              />
              <div className="hstack justify-content-between px-4">
                <Card.Title className="text-start">{image.title}</Card.Title>

                <button className="btn">
                  <FaShareNodes />
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
