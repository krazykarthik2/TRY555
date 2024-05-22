import { logEvent } from "firebase/analytics";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "./../../../utils/products";
import { analytics } from "./../../../firebase/firebase";
import Loading from "./../../utils/Loading";
import axios from "axios";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import "./ProductSingle.css";
const webHookURL = "https://webhooks.integrately.com/a/webhooks/027b68c97d1e45a68dd6d1ddd5effdba";
function ProductSingle() {
  const params = useParams();
  const [product, setProduct] = useState(null);
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
        name: formData.name,
        email: formData.email,
        message: formData.message,
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
    <div className="vstack h-100 gap-3 p-3">
      <div className="hstack flex-wrap gap-3">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-5"
          style={{ width: "300px" }}
        />

        <div className="vstack justify-content-center">
          <h2 className="text-start display-6 ">{product.name}</h2>
          <p className="display-6">{product.price}*</p>
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
            className="font-M rounded-3 d-flex flex-column justify-content-evenly h-100"
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

            <Button
              variant="primary"
              type="submit"
              className="font-I rounded-pill d-flex align-items-center justify-content-center gap-2 "
            >
              <h3 className="m-0">Submit</h3>
              <div className={"icon ms-3 " + (no_res_sent > 0 ? "sent" : "")}>
                <PiPaperPlaneRightFill size={"1.2em"} />
              </div>
            </Button>
            {no_res_sent == 0 || <div>We'll contact you shortly</div>}
            {no_res_sent > 0 && (
              <div className="hstack gap-2">
                <FaCheckCircle size={"2em"} />
                <div>{no_res_sent} response(s) sent successfullly</div>
              </div>
            )}
          </Form>
        </div>
        <div className="vstack">
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
