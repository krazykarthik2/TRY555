// src/components/Admin.js
import { signOut } from "firebase/auth";
import React from "react";
import { Button, Container, Row, Col, Stack } from "react-bootstrap";
import { FaImages, FaBoxOpen } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { IoMdAnalytics } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import { SiGooglesheets } from "react-icons/si";
import { Link } from "react-router-dom";

function Adminfx({ auth }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="text-center font-I my-4 vstack justify-content-between h-100">
      <h2>Admin Dashboard</h2>
      <div className="my-4 h-100 hstack gap-2">
        <Col>
          <Link
            to="upload/gallery"
            variant="primary"
            className="unlink btn-primary btn d-flex flex-column align-items-center py-4"
          >
            <GrGallery size={32} />
            <span className="mt-2">
              Upload
              <br /> Gallery
            </span>
          </Link>
        </Col>
        <Col>
          <Link
            to="upload/products"
            variant="primary"
            className="unlink btn-primary btn d-flex flex-column align-items-center py-4"
          >
            <FaBoxOpen size={32} />
            <span className="mt-2">
              Upload
              <br /> Products
            </span>
          </Link>
        </Col>
      </div>
      <div className="my-4 h-100 hstack gap-2">
        <Col>
          <Link
            to="https://docs.google.com/spreadsheets/d/1CHmVd4jL3NRzhitx2741t1JISDkFRfR0kPUfnF2RyW4/edit#gid=0"
            target="_new"
            variant="primary"
            className="unlink btn-primary btn d-flex flex-column align-items-center py-4"
          >
            <SiGooglesheets size={32} />
            <span className="mt-2">
              Contact
              <br /> Google sheet
            </span>
          </Link>
        </Col>
        <Col>
          <Link
            to="analytics"
            variant="primary"
            className="unlink btn-primary btn d-flex flex-column align-items-center py-4"
          >
            <IoMdAnalytics size={32} />
            <span className="mt-2">
              View
              <br /> Analytics
            </span>
          </Link>
        </Col>
      </div>
      <div>
        <Button variant="danger" className="font-I" onClick={handleLogout}>
          <span>Logout</span>
          <IoLogOutSharp size={"46"} />
        </Button>
      </div>
    </div>
  );
}

export default Adminfx;
