import { child, get, getDatabase, ref } from "firebase/database";
import { listFiles } from "./storage";
import { mapToArray } from "./utilities";

let collages = null;
const database = getDatabase();
const collageRef = ref(database, "/gallery");

async function getCollages() {
  try {
    const snapshot = await get(collageRef); // Use get() for one-time retrieval
    if (snapshot.exists) {
      collages = snapshot.val();
      for (let i in collages)
        collages[i] = {
          ...collages[i],
          images: await listFiles("gallery/" + collages[i].id),
        };
      return mapToArray(collages);
    } else {
      console.warn("No products found in the database.");
      return null; // Or return an empty array/object if appropriate
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
}

async function getCollage(gallery_id) {
  if (collages != null) {
    return collages[gallery_id];
  } else
    try {
      const productSnapshot = await get(child(collageRef, "/" + gallery_id));
      if (productSnapshot.exists) {
        let val = productSnapshot.val();
        val.images = listFiles("gallery/" + val.id);
        return val;
      } else {
        console.warn("Product not found in database:", gallery_id);
        return null;
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error; // Re-throw for handling in calling code
    }
}

export { getCollage, getCollages };
