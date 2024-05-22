import { child, get, getDatabase, onValue, ref } from "firebase/database";
import { once } from "firebase/database";
import { listFiles } from "./storage";
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
let prod = null;
const database = getDatabase();
const productRef = ref(database, "/products");

function mapToArray(map) {
  return Object.entries(map).map(([key, value]) => value);
}

async function getProducts() {
  try {
    const snapshot = await get(productRef); // Use get() for one-time retrieval
    if (snapshot.exists) {
      prod = snapshot.val();
      for( let  i in prod)
        prod[i]={...prod[i], images:await listFiles("products/" + prod[i].id) };
      return mapToArray(prod);
    } else {
      console.warn("No products found in the database.");
      return null; // Or return an empty array/object if appropriate
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
}

async function getProduct(product_id) {
  if (prod != null) {
    return prod[product_id];
  } else
    try {
      const productSnapshot = await get(child(productRef, "/" + product_id));
      if (productSnapshot.exists) {
        let val = productSnapshot.val();
        val.images = listFiles("products/" + val.id);
        return val;
      } else {
        console.warn("Product not found in database:", product_id);
        return null;
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error; // Re-throw for handling in calling code
    }
}

window.p = { prod, getProduct, getProducts };
export { getProduct, getProducts };
