import React, { useEffect, useState } from "react";
import { Card, Carousel, CarouselItem } from "react-bootstrap";
import { FaShoppingBag } from "react-icons/fa";
import "./Products.css"; // Import custom CSS for additional styling
import { getProducts } from "./../../utils/products";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { pathToImg } from "./../../utils/storage";
import Loading from "./../utils/Loading";
const auth = getAuth();
function ProductCard({ product }) {
  const [imgURLs, setImgURLs] = useState([]);
  useEffect(() => {
    if (product.images) {
      setImgURLs([]);
      console.log(product.images);
      product.images.forEach((img) =>
        pathToImg("/products/" + product.id + "/" + img).then((e) =>
          setImgURLs((x) => [...x, e])
        )
      );
    }
  }, [product.images]);
  return (
    <Link
      to={(auth.currentUser ? "/admin/manage/products/" : "") + "" + product.id}
      className="product-card-container unlink"
      key={product.id}
      draggable={false}
    >
      <Card className="product-card rounded-5 p-2 ">
        <Carousel>
          {imgURLs.map((url) => (
            <CarouselItem>
              <Card.Img
                variant="top"
                src={url}
                alt={product.name}
                className="rounded-5 pe-none"
                draggable={false}
              />
            </CarouselItem>
          ))}
        </Carousel>
        <Card.Body>
          <div className="hstack">
            <Card.Title className="text-start">{product.name}</Card.Title>
            <Card.Text>{product.price}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
function Products() {
  const [products, setProducts] = useState([]);
  window.products = products;
  window.getProducts = getProducts;
  useEffect(() => {
    getProducts().then((result) => setProducts(result));
  }, []);
  return (
    <div className="d-flex flex-column align-items-center text-center products-container">
      <div className="my-5">
        <h1>Discover Our Products</h1>
        <p className="lead mt-3">
          Explore our collection of handpicked products, carefully crafted to
          bring style and functionality to your everyday life.
        </p>
      </div>
      <div className="d-flex flex-wrap justify-content-center my-5">
        {products.length == 0 && <Loading />}
        {products?.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Products;
