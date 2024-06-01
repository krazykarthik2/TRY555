import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, remove, set } from "firebase/database";
import { getStorage } from "firebase/storage";
import { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { CgNametag } from "react-icons/cg";
import { FaHashtag, FaRupeeSign } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../utils/products";
import { deleteDir } from "../../utils/storage";
import "./UploadProducts.css";
import PlaneButton from "../utils/PlaneButton/PlaneButton";
import Back from "../utils/Back";
const auth = getAuth();
const storage = getStorage();
const database = getDatabase();
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
  const location = useLocation()
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

  async function handlePost(snapshot) {
    console.log("updating db");
    try {
      console.log(await postDb(snapshot ? snapshot.ref.name : null));

      if (mode == "edit") {
        navigate("/products");
      }

      setId("");
      setName("");
      setPrice("");
      setUploadStatus("success");
    } catch (error) {
      console.log("error at handlepost");
      console.log(error);
    }
  }

  const handleSubmit = async () => {
    if (!id || !name || !price) {
      alert("Missing required product data!");
      return;
    }
    setUploadStatus("uploading");
    try {
      await handlePost();
    } catch (error) {
      console.error("Error uploading product:", error);
      setUploadStatus("error");
    }
  };

  function handleDelete() {
    deleteDir("/products/" + id);
    remove(ref(database, "/products/" + id));
  }
  function manageImgs() {
    navigate(`/admin/manage/products/${id}/images`, {
      state: {
        id: id,
        name: name,
        price: price,
        continue__: location.pathname,
      },
    });
  }

  return (
    <div className="d-center w-100 h-100 position-relative">
      <div className="position-absolute top-0 start-0 m-4">
        <Back to="/admin" />
      </div>
      <div className="vstack h-100" style={{ maxWidth: "500px" }}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" d-flex flex-column p-4 gap-3 font-M bottom-0"
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

          <Button
            disabled={id==""}
            onClick={() => manageImgs()}
            className="btn btn-primary flex-column d-center rounded-4"
          >
            {" "}
            <GrGallery size={"3em"} />
            <span>
              Manage
              <br />
              Images
            </span>
          </Button>

          <div className="d-center">
            <PlaneButton
              type="submit"
              disabled={!isLoggedIn || uploadStatus === "uploading"}
              onClick={handleSubmit}
              text={
                uploadStatus === "uploading"
                  ? "Uploading..."
                  : uploadStatus === "success"
                  ? "Successful"
                  : "Upload Product"
              }
              fly={uploadStatus === "success"}
            />
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
