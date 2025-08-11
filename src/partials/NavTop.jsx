import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu} from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./CSS/NavTop.css";

function isMobile() {
  return window.innerWidth <= 992;
}

function NavTop() {
  const [mobile, setMobile] = useState(isMobile());
  const [sideMenu, setSideMenu] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSideMenu(false); // close side menu if open
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Responsive mobile menu
  const mobileMenu = (
    <div
      className="side-menu"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "80vw",
        maxWidth: 320,
        height: "100vh",
        background: "#fff",
        boxShadow: "-2px 0 16px rgba(0,0,0,0.07)",
        zIndex: 9999,
        padding: "2rem 1.2rem 1.2rem 1.2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
        transition: "right 0.2s",
      }}
    >
      <button
        onClick={() => setSideMenu(false)}
        style={{
          position: "absolute",
          top: 18,
          right: 18,
          background: "none",
          border: "none",
          fontSize: 28,
          color: "#1c658c",
          cursor: "pointer",
        }}
        aria-label="Close"
      >
        <IoMdClose />
      </button>
      <Nav.Link as={NavLink} to="/" onClick={() => setSideMenu(false)}>Home</Nav.Link>
      <Nav.Link as={NavLink} to="/about" onClick={() => setSideMenu(false)}>About</Nav.Link>
      <NavDropdown title="Journal" id="journal-dropdown-mobile">
        <NavDropdown.Item as={NavLink} to="/journal/national" onClick={() => setSideMenu(false)}>National</NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/journal/international" onClick={() => setSideMenu(false)}>International</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Conference" id="conference-dropdown-mobile">
        <NavDropdown.Item as={NavLink} to="/conference/national" onClick={() => setSideMenu(false)}>National</NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/conference/international" onClick={() => setSideMenu(false)}>International</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Patent" id="patent-dropdown-mobile">
        <NavDropdown.Item as={NavLink} to="/patent/published" onClick={() => setSideMenu(false)}>Published</NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/patent/granted" onClick={() => setSideMenu(false)}>Granted</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Book" id="book-dropdown-mobile">
        <NavDropdown.Item as={NavLink} to="/book/published" onClick={() => setSideMenu(false)}>Published</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link as={NavLink} to="/fdp" onClick={() => setSideMenu(false)}>FDP</Nav.Link>
      <Nav.Link as={NavLink} to="/membership" onClick={() => setSideMenu(false)}>Membership</Nav.Link>
      <Nav.Link as={NavLink} to="/experience" onClick={() => setSideMenu(false)}>Experience</Nav.Link>
      <Nav.Link as={NavLink} to="/awards" onClick={() => setSideMenu(false)}>Awards</Nav.Link>
      <Nav.Link as={NavLink} to="/extra" onClick={() => setSideMenu(false)}>Events</Nav.Link>
      <Nav.Link as={NavLink} to="/contact" onClick={() => setSideMenu(false)}>Contact</Nav.Link>
      <Nav.Link as={NavLink} to="/Studentreviews" onClick={() => setSideMenu(false)}>Student Reviews</Nav.Link>
      {user && (
        <button
          className="logout-button"
          onClick={handleLogout}
          style={{
            marginTop: "1rem",
            padding: "0.4rem 0.8rem",
            backgroundColor: "#c53030",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
          }}
          aria-label="Logout"
        >
          Logout
        </button>
      )}
    </div>
  );

  return (
    <Navbar collapseOnSelect expand="lg" variant="light" className="navtop py-3">
      <Container fluid className="px-4">
        <Navbar.Brand className="navtop-brand">
          <Link to="/" className="navbar-brand">
            Dr.MURUGADOSS <i id="normal">R</i>.
          </Link>
        </Navbar.Brand>

        {mobile ? (
          <button className="side-menu-toggle" onClick={() => setSideMenu(true)}>
            <FiMenu size={28} />
          </button>
        ) : (
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <FiMenu size={28} />
          </Navbar.Toggle>
        )}

        {!mobile && (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto navtop-list" style={{display:"flex", alignItems:"center"}}>
              <Nav.Link as={NavLink} to="/" className="accordion-toggle">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="accordion-toggle">About</Nav.Link>
              <NavDropdown title="Journal" id="journal-dropdown">
                <NavDropdown.Item as={NavLink} to="/journal/national">National</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/journal/international">International</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Conference" id="conference-dropdown">
                <NavDropdown.Item as={NavLink} to="/conference/national">National</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/conference/international">International</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Patent" id="patent-dropdown">
                <NavDropdown.Item as={NavLink} to="/patent/published">Published</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/patent/granted">Granted</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Book" id="book-dropdown">
                <NavDropdown.Item as={NavLink} to="/book/published">Published</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={NavLink} to="/fdp" className="accordion-toggle">FDP</Nav.Link>
              <Nav.Link as={NavLink} to="/membership" className="accordion-toggle">Membership</Nav.Link>
              <Nav.Link as={NavLink} to="/experience" className="accordion-toggle">Experience</Nav.Link>
              <Nav.Link as={NavLink} to="/awards" className="accordion-toggle">Awards</Nav.Link>
              <Nav.Link as={NavLink} to="/extra" className="accordion-toggle">Events</Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className="accordion-toggle">Contact</Nav.Link>
              <Nav.Link as={NavLink} to="/Studentreviews" className="accordion-toggle">Student Reviews</Nav.Link>

              {/* Show logout button only if logged in */}
              {user && (
                <button
                  className="logout-button"
                  onClick={handleLogout}
                  style={{
                    marginLeft: "1rem",
                    padding: "0.4rem 0.8rem",
                    backgroundColor: "#c53030",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                  aria-label="Logout"
                >
                  Logout
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>

      {/* Side menu for mobile */}
      {mobile && sideMenu && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.18)",
            zIndex: 9998,
          }}
          onClick={() => setSideMenu(false)}
        >
          {mobileMenu}
        </div>
      )}
    </Navbar>
  );
}

export default NavTop;
