import "./App.css";
import "./bs.css";
import "./theme.scss";
import "./fonts.css"
import { Suspense, lazy } from "react";
import Loading from "./components/utils/Loading";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavTop from "./components/NavTop";
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const AboutMore = lazy(() => import("./components/AboutMore"));
const Team = lazy(() => import("./components/Team"));
const Contact = lazy(() => import("./components/Contact"));
const Services = lazy(() => import("./components/Services"));
const Products = lazy(() => import("./components/Products"));
const Gallery = lazy(() => import("./components/Gallery"));
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <div className="vh-100 vw-100 d-flex flex-column">
          <NavTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about">
              <Route path="" element={<About />} />
              <Route path="more" element={<AboutMore />} />
              <Route path="team" element={<Team />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
