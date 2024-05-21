import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { FaShoppingBag } from "react-icons/fa";
import "./Products.css"; // Import custom CSS for additional styling
import { getProducts } from "./../../utils/products";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if(products.length==0)
    getProducts().then((result) => setProducts(result));
    console.log('fetch')
  },[]);
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
        {products.map((product) => (
          <Link to={""+product.id} className="product-card-container unlink" key={product.id}>
            <Card className="product-card rounded-5 p-2 ">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                className="rounded-5"
              />
              <Card.Body>
                <div className="hstack">

                  <Card.Title className="text-start">{product.name}</Card.Title>
                  <Card.Text>{product.price}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;
