import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import SideVertical from "./partials/SideVertical";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import About from "./components/About";
import NavTop from "./partials/NavTop";
import NavBot from "./partials/NavBot";
import Footer from "./partials/Footer";
import Login from "./pages/login";
import Home from "./components/Home";
import Extra from "./components/extra";
import "./index";
import Journal from "./pages/Journal";
import Conference from './pages/Conference';
import Patent from './pages/Patent';
import Book from './pages/Book';
import FDP from './pages/FDP';
import Membership from './pages/Membership';
import Experience from './pages/Experience';
import Awards from './pages/Awards';
import JournalNational from './pages/JournalNational';
import JournalInternational from './pages/JournalInternational';
import ConferenceNational from './pages/ConferenceNational';
import ConferenceInternational from './pages/ConferenceInternational';
import PatentPublished from './pages/PatentPublished';
import PatentGranted from './pages/PatentGranted';
import { Helmet,HelmetProvider } from "react-helmet-async";
import StudentReviews from "./pages/studentreview";
import Pdfview from './pages/pdfview';
import Journal1 from "./pages/pdfs/11.pdf";
function App() {
  const [preload, setPreload] = useState(true);

  setTimeout(function () {
    setPreload(false);
  }, 2000);

  if (preload) {
    return (
      <>
      <HelmetProvider>
        <Helmet>
          <title>Dr.MURUGADOSS R</title>
          </Helmet>
      </HelmetProvider>
        <div className="preload">
          <h1>
            <strong>Dr.MURUGADOSS R</strong>
           
          </h1>
          <p>─────</p>
          <Spinner animation="grow" />
        </div>
      </>
    );
  }

  return (
    <>
      <NavTop />
      <div className="d-flex">
        <SideVertical />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/journal" element={<Journal/>}></Route>
           <Route path="/conference" element={<Conference />} />
          <Route path="/patent" element={<Patent />} />
          <Route path="/book/published" element={<Book />} />
          <Route path="/fdp" element={<FDP />} />
          <Route path="/extra" element={<Extra />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/awards" element={<Awards />} />
           <Route path="/journal/national" element={<JournalNational />} />
          <Route path="/journal/international" element={<JournalInternational />} />
          <Route path="/conference/national" element={<ConferenceNational />} />
          <Route path="/conference/international" element={<ConferenceInternational />} />
          <Route path="/patent/published" element={<PatentPublished />} />
          <Route path="/patent/granted" element={<PatentGranted />} />
          <Route path="/studentreviews" element={<StudentReviews/>} />
          <Route path="/pdfview" element={<Pdfview />} />
          <Route path="/pdf/:pdfId" element={<Pdfview />} />
          <Route path="/journal1" element={<Journal1/>} />
          </Routes>
      </div>
      <Footer />
      <NavBot />
    </>
  );
}

export default App;
