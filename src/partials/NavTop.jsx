import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu} from "react-icons/fi";
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

  // ... your existing mobileMenu, JSX, etc.

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
        <>
          {/* your mobileMenu JSX here */}
        </>
      )}
    </Navbar>
  );
}

export default NavTop;
