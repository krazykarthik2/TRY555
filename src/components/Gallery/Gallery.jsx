import React from "react";
import { Card } from "react-bootstrap";
import "./Gallery.css"; // Import custom CSS for additional styling

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
            <Card className="gallery-card rounded-4 p-2">
              <Card.Img variant="top rounded-3" src={image.src} alt={image.title} />
              <Card.Title>{image.title}</Card.Title>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
