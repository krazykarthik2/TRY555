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

async function getProducts() {
  return products;
}
async function getProduct(product_id) {
  return products.find((e) => e.id == product_id);
}
export { getProduct, getProducts };
