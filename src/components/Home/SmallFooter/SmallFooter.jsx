import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./SmallFooter.css";

export default function SmallFooter() {
  return (
    <div className="small-footer  hstack contact-info justify-content-evenly  py-3">
      <Link to="mailto:goparajukarthik2@gmail.com?" className="d-center gap-2">
        <FaEnvelope />
        <span>goparajukarthik2@gmail.com</span>
      </Link>
      <div className="flex-sm-row flex-column d-flex w-50 justify-content-evenly">
        <Link to="tel:+917337498071" className="d-center gap-2">
          <FaPhoneAlt />
          <span>+917337498071</span>
        </Link>
        <Link to="tel:+919502520447" className="d-center gap-2">
          <FaPhoneAlt />
          <span>+919502520447</span>
        </Link>
      </div>
    </div>
  );
}
