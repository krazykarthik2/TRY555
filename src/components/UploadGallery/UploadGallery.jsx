import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, remove, set } from "firebase/database";
import {
  getStorage
} from "firebase/storage";
import { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { CgNametag } from "react-icons/cg";
import { FaHashtag } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { MdOutlineTextsms } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCollage } from "../../utils/gallery";
import { deleteDir } from "../../utils/storage";
import Back from "../utils/Back";
import PlaneButton from "../utils/PlaneButton/PlaneButton";
const auth = getAuth();
const storage = getStorage();
const database = getDatabase();
function UploadGallery() {
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
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [mode, setMode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const givenId = params["id"];
    let __mode = givenId != null ? "edit" : "upload";
    setMode(__mode);

    if (__mode == "edit" && id == "") {
      getCollage(givenId).then((collage_ref) => {
        console.log(collage_ref);
        setId(collage_ref.id);
        setTitle(collage_ref.title);
        setDesc(collage_ref.description);
      });
    }
  }, [params]);

  useEffect(() => {
    if (id == "") {
      if (location.state != null) {
        let collage_ref = location.state;
        setId(collage_ref.id);
        setTitle(collage_ref.title);
        setDesc(collage_ref.desc);
      }
    }
  }, [location]);
  const postDb = async (image = null) => {
    const collageRef = ref(database, `gallery/${id}`);
    let data = {
      id,
      title: title,
      description: desc,
    };
    return set(collageRef, data);
  };


  async function afterUpload(snapshot) {
    console.log("updating db");
    try {
      console.log(await postDb(snapshot ? snapshot.ref.name : null));

      if (mode == "edit") {
        navigate("/gallery");
      }
      setId("");
      setTitle("");
      setDesc("");

      setUploadStatus("success");
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async () => {
    setUploadStatus("uploading");
    if (!id || !title || !desc) {
      alert("Missing required collage data!");
      return;
    }

    try {
      await afterUpload();
    } catch (error) {
      console.error("Error uploading collage:", error);
      setUploadStatus("error");
    }
  };

  function handleDelete() {
    deleteDir("/gallery/" + id);
    remove(ref(database, "/gallery/" + id));
  }
  function manageImgs() {
    navigate(`/admin/manage/gallery/${id}/images`, {
      state: {
        id: id,
        title: title,
        desc: desc,
        continue__: location.pathname,
      },
    });
  }

  return (
    <div className="d-center w-100 h-100 position-relative">
      <div className="position-absolute top-0 start-0 m-4">
        <Back to="/admin" />
      </div>
      <div className="vstack h-100 " style={{ maxWidth: "500px" }}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" d-flex flex-column p-4 gap-3 font-M "
        >
          <div className="hstack">
            <FaHashtag size={"3em"} />
            <FormControl
              disabled={mode == "edit"}
              placeholder="collage_id"
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
              placeholder="title"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="hstack">
            <MdOutlineTextsms size={"3em"} />
            <FormControl
              placeholder="description"
              as={"textarea"}
              rows={5}
              type="text"
              id="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
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
                  : uploadStatus == "success"
                  ? "Successful"
                  : "Upload Collage"
              }
              fly={uploadStatus === "success"}
            />
          </div>
          <div className="d-center">
            {uploadStatus && (
              <p>
                {uploadStatus === "success" && "Collage uploaded successfully!"}
                {uploadStatus === "error" && "Error uploading collage"}
                {uploadStatus === "uploading" && "uploading collage"}
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

export default UploadGallery;
