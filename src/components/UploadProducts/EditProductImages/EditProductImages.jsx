import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FaCheck, FaPlus } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { listFiles, pathToImg } from "../../../utils/storage";
import { ref as refStorage } from "firebase/storage";
const storage = getStorage();
function ImgComp({ img, afterDelete }) {
  const [imgURL, setImgURL] = useState("");
  useEffect(() => {
    pathToImg(img).then((e) => setImgURL(e));
  }, [img]);
  function handleDelete() {
    const ref = refStorage(storage, img);
    console.log(ref);
    deleteObject(ref).then(() => afterDelete());
  }
  return (
    <Card className="d-flex flex-wrap flex-column w-min p-2">
      <Card.Img
        variant="top"
        src={imgURL}
        style={{
          width: "300px",
          height: "300px",
        }}
      />
      <div className="d-center gap-3">{img}</div>
      <div className="d-center gap-3">
        <Button className="hstack gap-2 btn-danger" onClick={handleDelete}>
          <RiDeleteBin5Fill size={"1.2em"} />
          <span>Delete</span>
        </Button>
      </div>
    </Card>
  );
}
function AddImgs({ id }) {
  const [prevImgs, setPrevImgs] = useState([]);
  const [prevImgLinks, setPrevImgLinks] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadEach, setUploadEach] = useState([]);
  useEffect(() => {
    if (prevImgs) setPrevImgLinks(prevImgs.map((e) => URL.createObjectURL(e)));
  }, [prevImgs]);
  useEffect(() => {
    if (uploadEach.length == 0) setUploadStatus(null);
    else if (uploadEach.every(true)) setUploadStatus("success");
    else setUploadStatus("uploading");
  }, [uploadEach]);
  const dropAreaRef = useRef(null);

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const highlight = () => {
    dropAreaRef.current.classList.add("highlight");
  };

  const unhighlight = () => {
    dropAreaRef.current.classList.remove("highlight");
  };

  const handleDrop = (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    setPrevImgs((e) => [...e, ...fileArray]);
  };

  const handleChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };
  function afterUpload(index) {
    setUploadEach((e) => {
      e[index] = true;
      return e;
    });
  }

  function handleUpload(image, index) {
    
    setUploadStatus("uploading");
    // Upload image to Firebase Storage
    const storageRef = refStorage(
      storage,
      `/products/${id}/${Date.now()}.${image.type.split("/")[1]}`
    );
    console.log("uploading file");
    const uploadTask = uploadBytes(storageRef, image);
    // Handle upload progress (optional)
    uploadTask
      .then((e) => afterUpload(index))
      .catch((error) => {
        console.error("Error uploading image:", error);
        setUploadStatus("error");
      });
  }
  function handleSubmit() {
    prevImgs.forEach((img, ind) => {
      handleUpload(img, ind);
    });
  }

  return (
    <div className="d-center vstack">
      <div className="d-center flex-wrap">
        {prevImgLinks.map((prev_link_, ind) => (
          <button
            className=" btn position-relative w-min img-cont"
            onClick={() => setPrevImgs((nn) => nn.filter((e, i) => i != ind))}
          >
            <img
              src={prev_link_}
              style={{
                height: "200px",
                width: "200px",
              }}
            />

            <Button className="pe-none btn-op position-absolute top-50 start-50 translate-middle ">
              <RiDeleteBin5Fill size={"60px"} />
            </Button>
          </button>
        ))}
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
      <div className="d-center">
        <label
          htmlFor="image"
          className="btn btn-primary flex-column d-center rounded-4"
          ref={dropAreaRef}
          onDragEnter={preventDefaults}
          onDragOver={(e) => {
            preventDefaults(e);
            highlight();
          }}
          onDragLeave={(e) => {
            preventDefaults(e);
            unhighlight();
          }}
          onDrop={(e) => {
            preventDefaults(e);
            unhighlight();
            handleDrop(e);
          }}
        >
          <FaPlus size={"1.2em"} />
          <span className="font-I">Upload New Image</span>
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          multiple
          hidden
          onInput={handleChange}
        />
      </div>
      <div className="d-center">
        <Button className="d-center gap-2">
          <span className="font-I">Submit</span>
          <FaCheck size={"1.2em"} />
        </Button>
      </div>
    </div>
  );
}
function EditProductImages() {
  const params = useParams();
  const [id, setId] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    setId(params["id"]);
  }, [params]);
  useEffect(() => {
    if (id) {
      listFiles("/products/" + id).then((e) => setImages(e));
    }
  }, [id]);

  return (
    <div className="vstack gap-2">
      <div className="hstack gap-4 flex-wrap p-4">
        {images.map((e, i) => (
          <ImgComp
            key={i}
            img={"products/" + id + "/" + e}
            afterDelete={() => setImages((x) => x.filter((e, ind) => i != ind))}
          />
        ))}
      </div>
      <AddImgs id={id} />
    </div>
  );
}

export default EditProductImages;
