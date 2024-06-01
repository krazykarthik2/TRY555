import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  ref as refStorage,
} from "firebase/storage";

const storage = getStorage();
const productRef = refStorage(storage, "/products");
const galleryRef = refStorage(storage, "/gallery");
const cacheMap = {};
async function pathToImg(path) {
  console.log(path);
  if (cacheMap[path]) return cacheMap[path];
  else {
    const ref__ = refStorage(storage, path);
    const url = await getDownloadURL(ref__);
    cacheMap[path] = url;

    return url;
  }
}

async function listFiles(pathPrefix = "") {
  let allFiles = []; // Array to store all file references
  let nextPageToken = null; // Pagination token

  do {
    const result = await listAll(ref(storage, pathPrefix), { nextPageToken });
    nextPageToken = result.nextPageToken; // Update token for next iteration
    allFiles = allFiles.concat(result.items); // Add retrieved files to the array
  } while (nextPageToken);
  return allFiles.map((e) => e.name);
}
async function deleteDir(directoryPath) {
  const listResult = await listAll(ref(storage, directoryPath));

  for (const item of listResult.items.concat(listResult.prefixes)) {
    const childPath = `${directoryPath}/${item.name}`;

    if (item.isDirectory) {
      await deleteDir(storage, childPath); // Recursively delete subdirectories
    } else {
      await deleteObject(ref(storage, childPath)); // Delete files
    }
  }
}
export { deleteDir, listFiles, pathToImg };

