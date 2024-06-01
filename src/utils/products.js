import { child, get, getDatabase, ref } from "firebase/database";
import { listFiles } from "./storage";
import { mapToArray } from "./utilities";

let prod = null;
const database = getDatabase();
const productRef = ref(database, "/products");

async function getProducts() {
  try {
    const snapshot = await get(productRef); // Use get() for one-time retrieval
    if (snapshot.exists) {
      prod = snapshot.val();
      for (let i in prod)
        prod[i] = {
          ...prod[i],
          images: await listFiles("products/" + prod[i].id),
        };
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

export { getProduct, getProducts };
