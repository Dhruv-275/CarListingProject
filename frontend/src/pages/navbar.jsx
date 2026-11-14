import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/slice/login";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storedUser = JSON.parse(localStorage.getItem("persist:user") || "{}");
  const username = storedUser.user ? storedUser.user.replace(/"/g, "") : "User";

  function logoutButton() {
    localStorage.removeItem("token");
    localStorage.removeItem("persist:user");
    dispatch(logout());
    navigate("/");
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-black fixed-top">
      <Container>
        <Navbar.Brand className="text-uppercase fw-bold">
          <Image
            src="/src/images/attendance_logo.png"
            width="75"
            height="70"
            alt="User Avatar"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/attendance">
              Attendance
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <NavDropdown
            title={
              <span>
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgCxxY3Ht7nj-Oha6zUqeOHo7drNmMLJZfvg&s"
                  roundedCircle
                  width="40"
                  height="40"
                  alt="User Avatar"
                  className="me-2"
                />
                {username}
              </span>
            }
            id="collapsible-nav-dropdown"
          >
            <NavDropdown.Item as={Link} to="/profile">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item>Result</NavDropdown.Item>
            <NavDropdown.Item>Help Center</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logoutButton}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
