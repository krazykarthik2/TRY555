import axios from "axios";
import React, { useState } from "react";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import SmallFooter from "./../Home/SmallFooter";
import "./Contact.css";
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

    axios
      .post(webHookURL, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time:new Date().valueOf()
      })
      .then(() => {
        alert("We'll contact you shortly");
        setNo_res_sent((e) => e + 1);
      }).catch((e)=>{
        console.error("error")
        console.error(e)
      })
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex h-100">
        <div className="d-flex flex-column justify-content-center w-100 ps-4">
          <h2>Get in Touch</h2>
          <p className="lead ps-4">
            Have a project in mind? Let's discuss how we can customize and
            deliver the best solution for you. Fill out the form below, and
            we'll get back to you for a real-time conversation.
          </p>
        </div>
        <div className="contact-form-container   d-flex flex-column justify-content-center w-100">
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

            <Button
              variant="primary"
              type="submit"
              className="rounded-pill d-flex align-items-center justify-content-center gap-2 "
            >
              <span>Submit</span>
              <PiPaperPlaneRightFill size={"1.2em"} />
            </Button>
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
