import React from "react";
import "./Gallery.css"; // Import custom CSS for additional styling
import { Button, Card } from "react-bootstrap";
import { FaDownload, FaShareNodes } from "react-icons/fa6";
import ImageDownloader from "./../utils/ImageDownloader";
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
          <CardImg image={image} index={index} key={index} />
        ))}
      </div>
    </div>
  );

  function CardImg({ index, image }) {
    const fileName = image.title;
    const title = "share this";
    const text = "sharing " + fileName;
    async function shareFile() {
      const blob = await fetch(image.src).then((res) => res.blob());
      const data = {
        files: [
          new File([blob], fileName, {
            type: blob.type,
          }),
        ],
        title,
        text,
      };
      if (navigator.canShare(data)) {
        try {
          await navigator.share(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.name, err.message);
          }
        } finally {
          return;
        }
      }
    }
    return (
      <div className="gallery-card-container" key={index}>
        <Card className="gallery-card rounded-5 p-2">
          <Card.Img variant="top rounded-5" src={image.src} alt={image.title} />
          <div className="hstack justify-content-between px-4">
            <Card.Title className="text-start">{image.title}</Card.Title>
            {/* <div>
              <ImageDownloader
                className="border-0 bg-transparent h6"
                text={<FaDownload />}
                imageUrl={image.src}
                fileName={image.title}
              />
              <button className="border-0 bg-transparent h6" onClick={() => shareFile()}>
                <FaShareNodes />
              </button>
            </div> */}
          </div>
        </Card>
      </div>
    );
  }
}

export default Gallery;
