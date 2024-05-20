import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function SmallFooter() {
  return <div className="hstack contact-info justify-content-evenly  py-3">
    <div>
      <FaEnvelope /> goparajukarthik2@gmail.com
    </div>
    <div className="flex-sm-row flex-column d-flex w-50 justify-content-evenly">
      <div>
        <FaPhoneAlt /> +917337498071
      </div>
      <div>
        <FaPhoneAlt /> +919502520447
      </div>
    </div>
  </div>;
}
