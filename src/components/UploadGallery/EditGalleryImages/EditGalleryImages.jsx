import {
  deleteObject,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, ProgressBar } from "react-bootstrap";
import { FaCheck, FaCheckCircle, FaPlus } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { listFiles, pathToImg } from "../../../utils/storage";
import { ref as refStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "./../../UploadProducts/UploadProducts.css";
const auth = getAuth();
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
function AddImgs({ id, location }) {
  const [prevImgs, setPrevImgs] = useState([]);
  const [prevImgLinks, setPrevImgLinks] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadEach, setUploadEach] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (prevImgs) setPrevImgLinks(prevImgs.map((e) => URL.createObjectURL(e)));
  }, [prevImgs]);

  useEffect(() => {
    console.log("change in uploadEach");
    if (uploadEach.length == 0) setUploadStatus(null);
    else if (uploadEach.every((e) => e == true)) setUploadStatus("success");
    else setUploadStatus("uploading");
  }, [uploadEach]);

  function nextStep() {
    if (location.state)
      if (location.state.continue__)
        navigate(location.state.continue__, { state: location.state });

    setPrevImgs([]);
    setUploadEach([]);
    setUploadStatus(null);
  }
  useEffect(() => {
    if (uploadStatus == "success") {
      nextStep();
    }
  });

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
      let x = [...e];
      console.log("upload completed for", index);
      x[index] = true;
      return x;
    });
  }

  function handleUpload(image, index) {
    setUploadStatus("uploading");
    // Upload image to Firebase Storage
    const storageRef = refStorage(
      storage,
      `/gallery/${id}/${Date.now()}.${image.type.split("/")[1]}`
    );
    console.log("uploading file");
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on("state_changed", (snapshot) => {
      switch (snapshot.state) {
        case "running":
          setUploadEach((e) => {
            let x = [...e];
            x[index] = {
              bytesTransferred: snapshot.bytesTransferred,
              totalBytes: snapshot.totalBytes,
            };
            return x;
          });
          break;
        default:
          setUploadEach((e) => {
            let x = [...e];
            x[index] = snapshot.state;
            return x;
          });
      }
    });
    // Handle upload progress (optional)
    uploadTask
      .then((e) => afterUpload(index))
      .catch((error) => {
        console.error("Error uploading image:", error);
        setUploadStatus("error");
      });
  }
  function handleSubmit() {
    console.log("handling submit");
    if (prevImgs.length == 0) nextStep();
    prevImgs.forEach((img, ind) => {
      handleUpload(img, ind);
    });
  }

  return (
    <div className="d-center vstack">
      <div className="d-center flex-wrap">
        {prevImgLinks.map((prev_link_, ind) => (
          <button
            key={ind}
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
            {/* uploadEach[{ind}] = {uploadEach[ind]} */}
            {uploadEach[ind] == true && (
              <div className="pe-none position-absolute top-50 start-50 translate-middle ">
                <FaCheck size={"100px"} color="#000" />
              </div>
            )}
            {uploadEach[ind]?.bytesTransferred != null && (
              <div className="hstack text-white">
                {uploadEach[ind].bytesTransferred}

                <ProgressBar
                  now={
                    (uploadEach[ind].bytesTransferred /
                      uploadEach[ind].totalBytes) *
                    100
                  }
                />
                {uploadEach[ind].totalBytes}
              </div>
            )}

            <div className="pe-none btn btn-primary btn-op position-absolute top-50 start-50 translate-middle ">
              <RiDeleteBin5Fill size={"60px"} />
            </div>
          </button>
        ))}
      </div>
      <div className="d-center">
        {uploadStatus && (
          <p>
            {uploadStatus === "success" && "Collage uploaded successfully!"}
            {uploadStatus === "error" && "Error uploading Collage"}
            {uploadStatus === "uploading" && "uploading Collage"}
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
      <div className="d-center mt-5">
        <Button className="d-center gap-2" onClick={() => handleSubmit()}>
          <span className="font-I">Submit</span>
          <FaCheck size={"1.2em"} />
        </Button>
      </div>
    </div>
  );
}
function EditGalleryImages() {
  const params = useParams();
  const [id, setId] = useState("");
  const [images, setImages] = useState([]);

  const location = useLocation();

  useEffect(() => {
    setId(params["id"]);
  }, [params]);
  useEffect(() => {
    if (id) {
      listFiles("/gallery/" + id).then((e) => setImages(e));
    }
  }, [id]);

  return (
    <>
      {auth.currentUser && (
        <div className="vstack gap-2">
          <div className="hstack gap-4 flex-wrap p-4">
            {images.map((e, i) => (
              <ImgComp
                key={i}
                img={"gallery/" + id + "/" + e}
                afterDelete={() =>
                  setImages((x) => x.filter((e, ind) => i != ind))
                }
              />
            ))}
          </div>
          <AddImgs id={id} location={location} />
        </div>
      )}
    </>
  );
}

export default EditGalleryImages;
