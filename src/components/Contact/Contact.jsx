import axios from "axios";
import { logEvent } from "firebase/analytics";
import { useState } from "react";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import {
  FaCheckCircle,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import SmallFooter from "../Home/SmallFooter/SmallFooter";
import PlaneButton from "../utils/PlaneButton/PlaneButton";
import { analytics } from "./../../firebase/firebase";
import "./Contact.css";
const org = {
  insta: "https://instagram.com/realtry555",
  whatsapp: "https://wa.me/+919502520447/?text=hi",
  telegram: "https://t.me/+918008107805",
};
const webHookURL =
  "https://webhooks.integrately.com/a/webhooks/208d8322884748dea4f6b955e0ad1b70";
function Contact() {
  const [no_res_sent, setNo_res_sent] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    console.log(formData);
    logEvent(analytics, "contact_via_form", {
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

  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex h-100 flex-md-row flex-column">
        <div className="d-flex flex-column justify-content-center w-100 ps-4">
          <div className="d-flex flex-column justify-content-center w-100 ps-4 ">
            <h2>Get in Touch</h2>
            <p className="lead ps-4 d-md-flex d-none">
              Have a project in mind? Let's discuss how we can customize and
              deliver the best solution for you. Fill out the form below, and
              we'll get back to you for a real-time conversation.
            </p>
          </div>
          <div className="d-flex justify-self-end flex-column justify-content-center w-100 ps-4">
            <h2>Follow</h2>

            <div className="socials d-flex gap-5 ">
              <Link to={org.insta} className="insta text-white">
                <FaInstagram size={"2em"} />
              </Link>
              <Link to={org.whatsapp} className="whatsapp text-white">
                <FaWhatsapp size={"2em"} />
              </Link>
              <Link to={org.telegram} className="telegram text-white">
                <FaTelegram size={"2em"} />
              </Link>
            </div>
          </div>
        </div>
        <div className="contact-form-container font-M  h-100  d-flex flex-column justify-content-center w-100">
          <Form
            onSubmit={handleSubmit}
            className="p-4 rounded-3 d-flex flex-column justify-content-evenly h-100"
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

            <FormGroup controlId="formMessage">
              <FormControl
                as="textarea"
                rows={5}
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
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
      </div>
      <div className="d-center">OR</div>
      <SmallFooter />
    </div>
  );
}

export default Contact;
