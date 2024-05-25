import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import {
  FaAngleLeft,
  FaAngleRight,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaWhatsapp,
  FaWrench,
} from "react-icons/fa";
import aboutBack from "./../../assets/about-back.png";
import aboutBack_hz from "./../../assets/about-back-hz.png";
import { SiGmail } from "react-icons/si";
import karthik from "./../../assets/team/karthik.png";
import sairam from "./../../assets/team/sairam.png";
import "./Team.css";
import { Link } from "react-router-dom";
const members = [
  {
    name: "karthik goparaju",
    email: "goparajukarthik2@gmail.com",
    image: { src: karthik },
    alt: "karthikkrazy",
    position: "cofounder",
    phone: "+918008107805",
    insta: "https://instagram.com/karthik_goparaju_",
    linkedin: "https://linkedin.com/in/karthikkrazy",
    dob: { d: 2, m: 5, y: 2006 },
    desc: `I am currently /age years old and I am from West Godavari, Andhra
    Pradesh. Growing up, I thrived on learning and achieving, and my
    passion for art has been a constant source of motivation. From a
    young age, I have been a tinkerer, always eager to explore and
    create. My curiosity and dedication to my craft drive me to
    continually progress and excel in my endeavors.`,
  },
  {
    name: "sai ram",
    email: "sairamec@gmail.com",
    image: { src: sairam },
    alt: "sairam",
    position: "cofounder",
    phone: "+919502520447",
    insta: "https://instagram.com/karthik_goparaju_",
    linkedin: "https://linkedin.com/in/karthikkrazy",
    dob: { d: 21, m: 10, y: 2005 },
    desc: `At /age years old, I hail from Andhra Pradesh, a region that has deeply influenced my creative journey. My early years were marked by an insatiable curiosity and a relentless drive to learn. Art has always been my guiding light, inspiring me to explore new horizons and push the boundaries of my creativity.
    From the moment I could hold a tool, I was fascinated by how things worked. This fascination led me to dismantle and reassemble various gadgets, instilling in me a profound understanding of technology and engineering. My artistic pursuits ran parallel, with each brushstroke and design project serving as an outlet for my boundless imagination.
    My educational journey has been a tapestry of diverse experiences. I immersed myself in subjects ranging from the arts to the sciences, each discipline offering unique insights and skills. Through self-directed learning and formal education, I cultivated a versatile skill set that bridges the gap between creativity and technology.`,
  },
];
function SimplifyPerson({ person, openStory }) {
  return (
    <Card
      className="person mx-auto mb-2 rounded-5 p-2 bg-transparent border-0"
      onClick={() => openStory()}
    >
      <div className="hstack">
        <div className="vstack">
          <div className="role font-I h2 w-100 text-center">
            {person.position}
          </div>
          <div>
            <Card.Img
              variant="bottom"
              src={person.image.src}
              width={"200px"}
              height={"200px"}
              className=" rounded-5 bg-dark"
            />
            <div className="vstack position-absolute w-100 bottom-0 mb-2 ps-4">
              <Card.Title className="h2 text-center">{person.name}</Card.Title>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
function Person({ person, isOpen, setIsOpen, isOtherOpen }) {
  const age = new Date().getFullYear() - person.dob.y;
  const [view, setView] = useState(false);
  window.openStory = openStory;
  window.setIsOpen = setIsOpen;
  window.person = person;
  function openStory() {
    setIsOpen(true);
  }
  return isOtherOpen() && !isOpen ? (
    <SimplifyPerson {...{ openStory, person }} />
  ) : (
    <Card
      className={
        "person mx-auto mb-2 rounded-5 p-0 border-0 " +
        (isOpen ? "expanded" : "collapsed")
      }
    >
      <div className="bg"></div>
      <div className="bghover"></div>
      <div className="hstack flex-wrap">
        <div className="vstack flex-wrap">
          <div className="d-center p-2">
            <Card.Img
              variant="top rounded-5  bg-dark w-auto"
              src={person.image.src}
              width={"235px"}
              height={"235px"}
              className="d-sm-none"
            />
            <Card.Img
              variant="top rounded-5  bg-dark w-auto"
              src={person.image.src}
              width={"300px"}
              height={"300px"}
              className="d-none d-sm-flex d-md-none"
            />
            <Card.Img
              variant="top rounded-5  bg-dark w-auto"
              src={person.image.src}
              width={"350px"}
              height={"350px"}
              className="d-none d-md-block"
            />
            <div className="socials position-absolute end-0  translate-middle">
              <div className="vstack  me-1 gap-2 ">
                <div className="mb-4"></div>
                <Link to={person.insta} className="insta text-white">
                  <FaInstagram size={"2em"} />
                </Link>
                <Link to={person.linkedin} className="linkedin text-white">
                  <FaLinkedin size={"2em"} />
                </Link>
              </div>
            </div>
          </div>
          <Card.Body className="py-2">
            <div className="vstack ">
              <Card.Title className="text-start expand h4 hovercenter">
                {person.name}
              </Card.Title>
              <div className="hstack justify-content-between">
                <div className="alt text-muted expand">@{person.alt}</div>
                <div className="position text-muted expand">
                  ~{person.position}
                </div>
              </div>
              <div className="vstack p gap-2">
                <div className="hstack gap-2 ">
                  <Link
                    target="_new"
                    to={"mailto:" + person.phone}
                    className="text-white hstack gap-2 text-decoration-none"
                  >
                      <SiGmail
                        size="1.2em"
                        className="icon  colorized "
                        style={{ "--color": "#F92723" }}
                      />
                    <span className="text-decoration-underline">
                      {person.email}
                    </span>
                  </Link>
                </div>
                <div className="hstack gap-2 justify-content-between">
                  <Link
                    target="_new"
                    to={"tel:" + person.phone}
                    className="text-white hstack gap-2 text-decoration-none"
                  >
                      <FaPhoneAlt
                        size="1.2em"
                        className="icon colorized "
                        style={{ "--color": "#177FF7" }}
                      />
                    <span className="text-decoration-underline">
                      {person.phone}
                    </span>
                  </Link>
                  <Link
                    target="_new"
                    to={"https://wa.me/" + person.phone + "/?text=Hi"}
                  >
                      <FaWhatsapp
                        size={"2em"}
                        className="expand colorized "
                        style={{ "--color": "#25CF64" }}
                      />
                  </Link>
                </div>
                {isOpen || (
                  <div className="d-center font-I">
                    <Button
                      className="btn-secondary rounded-pill px-4 updown"
                      onClick={() => {
                        setIsOpen(true);
                      }}
                    >
                      <span>my story</span>
                      <FaAngleRight size={"1.7em"} className="expand" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card.Body>
        </div>
        {isOpen ? (
          <div className="vstack desc w-100">
            <div className="hstack w-100 h-100">
              <div className="ps-3">
                <p>{person.desc.replaceAll("/age", age)}</p>
              </div>
              <button
                className="btn"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <FaAngleLeft size={"3em"} />
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </Card>
  );
}
function Team() {
  const [open, setOpen] = useState(new Array(members.length).fill(false));
  const [the_m, setThe_m] = useState(members);
  window.open = open;
  function isSthOpen() {
    return open.some((e) => e);
  }
  return (
    <div className="team h-100 d-center overflow-x-hidden">
      <div className="hstack d-center  flex-wrap justify-content-between h-100 w-100">
        {isSthOpen() || (
          <div className="d-flex ">
            <img
              src={aboutBack}
              className="d-none d-xl-block"
              width={"200px"}
            />
            <img
              src={aboutBack}
              className="d-xl-none d-vsm-block  d-none-n-imp"
              width={"50px"}
            />
            <img
              src={aboutBack_hz}
              className="d-xl-none d-vsm-none  d-block-n-imp"
              height={"50px"}
            />
          </div>
        )}

        {the_m.map((person, i) => (
          <Person
            person={person}
            key={i}
            isOpen={open[i]}
            setIsOpen={(e) =>
              setOpen(() => {
                let x = new Array(open.length).fill(false);
                x[i] = e;
                return x;
              })
            }
            isOtherOpen={() =>
              open.findIndex((e, ind) => e == true && ind != i) != -1
            }
          />
        ))}
        <div className="right nothing"></div>
      </div>
    </div>
  );
}

export default Team;
