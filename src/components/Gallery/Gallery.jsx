import { getAuth } from "firebase/auth";
import React, { useEffect, useMemo, useState } from "react";
import { Card, Carousel, CarouselItem } from "react-bootstrap";
import { FaEllipsis } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { listFiles, pathToImg } from "../../utils/storage";
import { getCollages } from "./../../utils/gallery";
import LazyLoadImage from "./../utils/LazyLoadImage";
import "./Gallery.css"; // Import custom CSS for additional styling
const auth = getAuth();
function CardImg({ index, src, title }) {
  const fileName = title;
  const cardTitle = "share this";
  const text = "sharing " + fileName;
  async function shareFile() {
    const blob = await fetch(src).then((res) => res.blob());
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
        <Card.Img variant="top rounded-5" src={src} alt={title} />
        <div className="hstack justify-content-between px-4">
          <Card.Title className="text-start">{title}</Card.Title>
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

function Collage({ collage }) {
  const [images, setImages] = useState([]);
  const [imgURLs, setImgURLs] = useState([]);
  const [imgMap, setImgMap] = useState({});
  useMemo(() => {
    listFiles("gallery/" + collage.id).then((fileArr) => {
      if (images.length == 0) setImages(fileArr);
    });
  }, [collage]);

  useEffect(() => {
    if (images) {
      images.forEach((img) =>
        pathToImg("/gallery/" + collage.id + "/" + img).then((downloadLink) =>
          setImgMap((e) => ({ ...e, [img]: downloadLink }))
        )
      );
    }
  }, [images]);

  useEffect(() => {
    let x = [];
    for (let img of images) x.push(imgMap[img]);
    console.log(x);
    setImgURLs(x.filter((e) => e));
  }, [imgMap]);

  return (
    <Link
      className="gallery-card-container unlink mw-px-400"
      to={(auth.currentUser ? "/admin/manage/gallery/" : "") + "" + collage.id}
    >
      <Carousel interval={null}>
        {imgURLs.map((url, index) => (
          <CarouselItem key={index}>
            <LazyLoadImage
              src={url}
              alt={collage.title + "#" + index}
              className="rounded-5 pe-none card-img-top"
              draggable={false}
            />
          </CarouselItem>
        ))}
      </Carousel>
      
      <h3>{collage.title}</h3>
        <div
          className="font-M"
          style={{
            overflow: "hidden",
            maxHeight: "3em",
            textOverflow: "ellipsis",
          }}
        >
          {collage.description}
        </div>
        <FaEllipsis className="flex-grow-1" size={'1.2em'}/>
    
    </Link>
  );
}
function Gallery() {
  const [collages, setCollages] = useState([]);
  window.collage = collages;
  useEffect(() => {
    getCollages().then((result) => setCollages(result));
  }, []);

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
        {collages.map((c, index) => (
          <Collage collage={c} index={index} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
