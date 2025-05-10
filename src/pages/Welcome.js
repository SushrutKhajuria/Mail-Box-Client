// src/pages/Welcome.js
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";

const Welcome = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container className="mt-5 text-center">
      <h2 className="mb-4">Welcome to your mail box 📬</h2>

      <Row className="justify-content-center mb-3">
        <Col xs="auto">
          <Button variant="primary" onClick={() => navigate("/compose")}>
            ✍️ Compose Mail
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={() => navigate("/inbox")}>
            📥 Inbox
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="info" onClick={() => navigate("/sent")}>
            📤 Sent
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="danger" onClick={logoutHandler}>
            🚪 Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
