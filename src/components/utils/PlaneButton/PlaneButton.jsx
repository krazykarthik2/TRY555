import React from "react";
import "./PlaneButton.css";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { Button } from "react-bootstrap";

function PlaneButton({ text, fly, variant = "primary", type, disabled,onClick }) {
  return (
    <Button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className="planeButton font-I rounded-pill d-flex align-items-center justify-content-center gap-2 "
    >
      <h3 className="m-0">{text}</h3>
      <div className={"icon ms-3 " + (fly ? "sent" : "")}>
        <PiPaperPlaneRightFill size={"1.2em"} />
      </div>
    </Button>
  );
}

export default PlaneButton;
