import React from "react";
import { Card } from "react-bootstrap";
import { FaShoppingBag } from "react-icons/fa";
import "./Products.css"; // Import custom CSS for additional styling

const products = [
  {
    id: 1,
    name: "Handcrafted Ceramic Mug",
    price: "$25",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "Vintage Leather Backpack",
    price: "$120",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    name: "Artisanal Scented Candle",
    price: "$30",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 4,
    name: "Handwoven Throw Blanket",
    price: "$50",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    price: "$65",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 6,
    name: "Organic Cotton Tote Bag",
    price: "$20",
    image: "https://via.placeholder.com/300",
  },
];

function Products() {
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
          <div className="product-card-container" key={product.id}>
            <Card className="product-card rounded-5 p-2 ">
              <Card.Img variant="top" src={product.image} alt={product.name} className="rounded-5"/>
              <Card.Body>
                <div className="hstack">
                  <Card.Title className="text-start">{product.name}</Card.Title>
                  <Card.Text>{product.price}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
