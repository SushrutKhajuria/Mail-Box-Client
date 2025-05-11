import { useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col, Spinner } from "react-bootstrap";
import { auth } from "../firebase";
import { formatEmail } from "../services/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Sent = () => {
  const [sentMails, setSentMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSent = async () => {
      try {
        const userEmail = auth.currentUser?.email;
        const token = await auth.currentUser.getIdToken();
        const formattedEmail = formatEmail(userEmail);

        const { data } = await axios.get(
          `https://mail-box-client-7fb43-default-rtdb.firebaseio.com/users/${formattedEmail}/sent.json?auth=${token}`
        );

        if (data) {
          const loadedSent = Object.keys(data).map((id) => ({
            id,
            ...data[id],
          }));
          setSentMails(loadedSent.reverse());
        } else {
          setSentMails([]);
        }
      } catch (err) {
        console.error("Error fetching sent mails:", err.message);
        setSentMails([]);
      }
      setLoading(false);
    };

    fetchSent();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Row className="mb-4">
          <Col>
            <h3>📤 Sent Mails</h3>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={() => navigate("/compose")}>
              ✍️ Compose
            </Button>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <ListGroup>
            {sentMails.length === 0 && <p>No mails sent yet.</p>}
            {sentMails.map((mail) => (
              <ListGroup.Item
                key={mail.id}
                className="d-flex justify-content-between align-items-start"
                onClick={() => navigate(`/mail/${mail.id}`)}
                style={{ cursor: "pointer" }}
              >
                <Row style={{ width: "100%" }}>
                  <Col>
                    <strong>To:</strong> {mail.to} <br />
                    <strong>Subject:</strong> {mail.subject} <br />
                    <span dangerouslySetInnerHTML={{ __html: mail.body.slice(0, 100) + "..." }}></span>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Container>
    </>
  );
};

export default Sent;
