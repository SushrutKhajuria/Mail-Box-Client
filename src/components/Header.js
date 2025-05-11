// src/components/Header.js
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");       
    navigate("/login");                   
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/inbox")} style={{ cursor: "pointer" }}>
          📫 Mail Box Client
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link onClick={() => navigate("/compose")}>✍️ Compose</Nav.Link>
          <Nav.Link onClick={() => navigate("/inbox")}>📥 Inbox</Nav.Link>
          <Nav.Link onClick={() => navigate("/sent")}>📤 Sent</Nav.Link>
          <Button variant="outline-danger" size="sm" onClick={logoutHandler}>
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
