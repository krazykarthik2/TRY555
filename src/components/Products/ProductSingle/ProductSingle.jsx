import axios from "axios";
import { logEvent } from "firebase/analytics";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselItem,
  Form,
  FormControl,
  FormGroup
} from "react-bootstrap";
import { FaCheckCircle, FaRupeeSign } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import PlaneButton from "src/components/utils/PlaneButton/PlaneButton";
import { listFiles, pathToImg } from "../../../utils/storage";
import { analytics } from "./../../../firebase/firebase";
import { getProduct } from "./../../../utils/products";
import Loading from "./../../utils/Loading";
import "./ProductSingle.css";
const webHookURL =
  "https://webhooks.integrately.com/a/webhooks/027b68c97d1e45a68dd6d1ddd5effdba";
function ProductSingle() {
  const params = useParams();
  const [product, setProduct] = useState(null);

  const [images, setImages] = useState([]);
  const [imgURLs, setImgURLs] = useState([]);

  useEffect(() => {
    if (images) {
      setImgURLs([]);
      console.log(images);
      images.forEach((img) =>
        pathToImg("/products/" + params["id"] + "/" + img).then((e) =>
          setImgURLs((x) => [...x, e])
        )
      );
    }
  }, [images]);
  useEffect(() => {
    if (params["id"]) {
      listFiles("/products/" + params["id"]).then((e) => setImages(e));
    }
  }, [params]);

  useEffect(() => {
    getProduct(params["id"]).then((result) => {
      setProduct(result);
    });
  }, [params]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [no_res_sent, setNo_res_sent] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    console.log(formData);
    logEvent(analytics, "order_product", {
      time: Date.now(),
    });

    axios
      .post(webHookURL, {
        productId: params["id"],
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        time: new Date().valueOf(),
      })
      .then(() => {
        setNo_res_sent((e) => e + 1);
      })
      .catch((e) => {
        console.error("error");
        console.error(e);
      });
  };

  return product == null ? (
    <Loading />
  ) : (
    <div className="vstack h-100 gap-3 overflow-x-hidden ">
      <div className="d-flex flex-wrap  justify-content-between w-100">
        <Carousel className="vw-md-50 d-flex vw-90 mb-3 p-2">
          {imgURLs.map((url) => (
            <CarouselItem>
              <img
                variant="top"
                src={url}
                alt={product.name}
                className="rounded-5 pe-none w-100 "
                draggable={false}
              />
            </CarouselItem>
          ))}
        </Carousel>

        <div className="d-flex flex-column vw-md-45 justify-content-center ">
          <h2 className="text-start display-6 ">{product.name}</h2>
          <p className="display-6">
            <FaRupeeSign />
            {product.price}*
          </p>
          <span>*All prices are assured.</span>
          <span>
            * While customisation offers more values for a little bit more money
          </span>
        </div>
      </div>
      <div className="hstack flex-wrap gap-2 h-100">
        <div className="vstack">
          <Form
            onSubmit={handleSubmit}
            className="font-M rounded-3 d-flex flex-column gap-2 p-5 py-2 justify-content-evenly h-100"
          >
            <FormGroup controlId="formName">
              <FormControl
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup controlId="formEmail">
              <FormControl
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup controlId="formPhone">
              <FormControl
                type="tel"
                pattern="[+0-9]{13}"
                placeholder="Phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength={13}
              />
            </FormGroup>

            <PlaneButton type="submit" text="Submit" fly={no_res_sent > 0} />
            {no_res_sent == 0 || <div>We'll contact you shortly</div>}
            {no_res_sent > 0 && (
              <div className="hstack gap-2">
                <FaCheckCircle size={"2em"} />
                <div>{no_res_sent} response(s) sent successfullly</div>
              </div>
            )}
          </Form>
        </div>
        <div className="vstack justify-content-between">
          <h2>Order this</h2>
          <p>
            For quotations and other customisations or such please contact us
            <Link className="btn btn-primary" to="/contact">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductSingle;
