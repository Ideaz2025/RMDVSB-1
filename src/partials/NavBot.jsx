import { Link, useLocation } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./CSS/NavBot.css";

const menuOrder = [
  { path: "/", title: "Home" },
  { path: "/about", title: "About" },
  { path: "/journal/national", title: "Journal National" },
  { path: "/journal/international", title: "Journal International" },
  { path: "/conference/national", title: "Conference National" },
  { path: "/conference/international", title: "Conference International" },
  { path: "/patent/published", title: "Patent Published" },
  { path: "/book/published", title: "Book Published" },
  { path: "/fdp", title: "FDP" },
  { path: "/membership", title: "Membership" },
  { path: "/experience", title: "Experience" },
  { path: "/awards", title: "Awards" },
  { path: "/extra", title: "Events & Subject handled" },
  { path: "/contact", title: "Contact" },
  { path: "/Studentreviews", title: "Student Reviews" }
];

function NavBot() {
  const { pathname } = useLocation();
  const currentIndex = menuOrder.findIndex(item => item.path === pathname);

  // Fallback for unknown paths
  const page = menuOrder[currentIndex] || { title: "", path: "" };
  const numberPage = currentIndex >= 0 ? String(currentIndex + 1).padStart(2, "0") : "--";
  const totalPages = menuOrder.length;

  // Circular navigation
  const directUp = menuOrder[(currentIndex - 1 + totalPages) % totalPages]?.path || "/";
  const directDown = menuOrder[(currentIndex + 1) % totalPages]?.path || "/";

  return (
    <>
      <footer className="navbot px-4">
        <div className="navbot-left d-flex">
          <p className="navbot-title">{page.title}</p>
          <p className="navbot-number">
            {numberPage} <span className="disabled-color">/ {totalPages}</span>
          </p>
        </div>
        <div className="navbot-right d-flex">
          <Link to={directUp} className="d-flex align-items-center arrow">
            <AiOutlineArrowLeft />
          </Link>
          <Link
            to={directDown}
            className="d-flex align-items-center ps-4 arrow"
          >
            <AiOutlineArrowRight />
          </Link>
        </div>
      </footer>
    </>
  );
}

export default NavBot;
