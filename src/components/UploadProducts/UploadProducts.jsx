import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, remove, set } from "firebase/database";
import {
  deleteObject,
  getStorage,
  ref as refStorage,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { CgNametag } from "react-icons/cg";
import { FaHashtag, FaRupeeSign, FaTrash } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../utils/products";
import { deleteDir, pathToImg } from "../../utils/storage";
import "./UploadProducts.css";
import { RiDeleteBin2Fill, RiDeleteBin5Fill } from "react-icons/ri";
const auth = getAuth();
const storage = getStorage();
const database = getDatabase();
window.auth = auth;
function UploadProducts() {
  const params = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setIsLoggedIn(user != null);
    });

    // Cleanup function to detach listener when component unmounts
    return unsubscribe;
  }, []);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [mode, setMode] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const givenId = params["id"];
    let __mode = givenId != null ? "edit" : "upload";
    setMode(__mode);

    if (__mode == "edit" && id == "") {
      getProduct(givenId).then((product_refer_) => {
        console.log(product_refer_);
        setId(product_refer_.id);
        setName(product_refer_.name);
        setPrice(product_refer_.price);
      });
    }
  }, [params]);

  const postDb = async () => {
    const productRef = ref(database, `products/${id}`);
    let data = {
      id,
      name,
      price,
    };
    return set(productRef, data);
  };

  window.postDb = postDb;

  function handlePost(snapshot) {
    console.log("updating db");
    try {
      postDb(snapshot ? snapshot.ref.name : null);

      if (mode == "edit") {
        navigate("/products");
      }
      setId("");
      setName("");
      setPrice("");
      setUploadStatus("success");
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async () => {
    setUploadStatus("uploading");
    if (!id || !name || !price) {
      alert("Missing required product data!");
      return;
    }

    try {
      handlePost();
    } catch (error) {
      console.error("Error uploading product:", error);
      setUploadStatus("error");
    }
  };

  function handleDelete() {
    deleteDir("/products/" + id);
    remove(ref(database, "/products/" + id));
  }

  return (
    <div className="d-center w-100 h-100">
      <div className="vstack h-100 " style={{ maxWidth: "500px" }}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" d-flex flex-column p-4 gap-3 font-M "
        >
          <div className="hstack">
            <FaHashtag size={"3em"} />
            <FormControl
              disabled={mode == "edit"}
              placeholder="product id"
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div className="hstack">
            <CgNametag size={"3em"} />
            <FormControl
              placeholder="name"
              as={"textarea"}
              rows={3}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="hstack">
            <FaRupeeSign size={"3em"} />
            <FormControl
              placeholder="price"
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <Link
            to="images"
            className="btn btn-primary flex-column d-center rounded-4"
          >
            {" "}
            <GrGallery size={"3em"} />
            <span>
              Manage
              <br />
              Images
            </span>
          </Link>

          <div className="d-center">
            <button
              type="submit"
              disabled={!isLoggedIn || uploadStatus === "uploading"}
              onClick={handleSubmit}
              className="rounded-pill"
            >
              {uploadStatus === "uploading" ? "Uploading..." : "Upload Product"}
            </button>
          </div>
          <div className="d-center">
            {uploadStatus && (
              <p>
                {uploadStatus === "success" && "Product uploaded successfully!"}
                {uploadStatus === "error" && "Error uploading product"}
                {uploadStatus === "uploading" && "uploading product"}
              </p>
            )}
          </div>
        </form>
        {mode == "edit" && (
          <div className="d-center font-I">
            <Button
              className="btn-danger hstack gap-1 pe-4"
              onClick={handleDelete}
            >
              <RiDeleteBin5Fill size={"35px"} />
              <span className="h4 m-0 text-start ">
                Delete <br />
                <i>{id}</i>
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadProducts;
