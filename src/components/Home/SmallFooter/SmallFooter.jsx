import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./SmallFooter.css";

export default function SmallFooter() {
  return (
    <div className="small-footer font-M text-white hstack contact-info justify-content-evenly  py-3">
      <Link to="mailto:goparajukarthik2@gmail.com?" className="d-center gap-2 text-white">
        <FaEnvelope />
        <span>goparajukarthik2@gmail.com</span>
      </Link>
      <div className="flex-sm-row flex-column d-flex w-50 justify-content-evenly">
        <Link to="tel:+918008107805" className="d-center gap-2 text-white">
          <FaPhoneAlt />
          <span>+918008107805</span>
        </Link>
        <Link to="tel:+919502520447" className="d-center gap-2 text-white">
          <FaPhoneAlt />
          <span>+919502520447</span>
        </Link>
      </div>
    </div>
  );
}
