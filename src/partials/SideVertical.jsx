import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import "./CSS/SideVertical.css";

function SideVertical() {
  const { pathname } = useLocation();
  const date = new Date().toISOString().slice(0, 10);

  // Updated navigation order and paths
  const pages = [
    { path: "/", number: "01", title: "Profile" },
    { path: "/journal/national", number: "02", title: "National Journal" },
    { path: "/journal/international", number: "03", title: "International Journal" },
    { path: "/conference/national", number: "04", title: "National Conference" },
    { path: "/conference/international", number: "05", title: "International Conference" },
    { path: "/patent/published", number: "06", title: "Patent" },
    { path: "/book/published", number: "07", title: "Book" },
    { path: "/fdp", number: "08", title: "FDP" },
    { path: "/membership", number: "09", title: "Membership" },
    { path: "/experience", number: "10", title: "Experience" },
    { path: "/contact", number: "11", title: "Contact" },
    { path: "/awards", number: "12", title: "Awards" },
    { path: "/Studentreviews", number: "13", title: "Student Reviews" },
  ];

  // Find the current page index, fallback to 0 if not found
  const currentIndex = pages.findIndex((p) => p.path === pathname);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const currentPage = pages[safeIndex];

  const numberPage = currentPage.number;
  const titlePage = currentPage.title;
  const directUp = pages[(safeIndex - 1 + pages.length) % pages.length].path;
  const directDown = pages[(safeIndex + 1) % pages.length].path;

  return (
    <div className="side-vertical">
      <div className="upper-side d-flex">
        <p className="side-title">{titlePage}</p>
        <p className="side-date">{date}</p>
      </div>
      <div className="lower-side d-flex">
        <p className="side-number">
          {numberPage}
          <span className="disabled-color">
            / {pages.length.toString().padStart(2, "0")}
          </span>
        </p>
        <Link
          to={directUp}
          className="d-flex align-items-center pb-3 arrow"
        >
          <AiOutlineArrowUp />
        </Link>
        <Link to={directDown} className="d-flex align-items-center arrow">
          <AiOutlineArrowDown />
        </Link>
      </div>
    </div>
  );
}

export default SideVertical;

