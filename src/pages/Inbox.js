// src/pages/Inbox.js
import { useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col, Spinner } from "react-bootstrap";
import { auth } from "../firebase";
import { formatEmail } from "../services/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const userEmail = auth.currentUser?.email;
        const token = await auth.currentUser.getIdToken();
        const formattedEmail = formatEmail(userEmail);

        const { data } = await axios.get(
          `https://mail-box-client-7fb43-default-rtdb.firebaseio.com/users/${formattedEmail}/inbox.json?auth=${token}`
        );

        if (data) {
          const loadedInbox = Object.keys(data).map((id) => ({
            id,
            ...data[id],
          }));

          setInbox(loadedInbox.reverse()); // newest on top
        } else {
          setInbox([]);
        }
      } catch (err) {
        console.error("Error fetching inbox:", err.message);
        setInbox([]);
      }
      setLoading(false);
    };

    fetchInbox();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h3>📥 Your Inbox</h3>
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
          {inbox.length === 0 && <p>No mails received yet.</p>}
          {inbox.map((mail) => (
            <ListGroup.Item key={mail.id}>
              <strong>From:</strong> {mail.from} <br />
              <strong>Subject:</strong> {mail.subject} <br />
              <span dangerouslySetInnerHTML={{ __html: mail.body.slice(0, 100) + "..." }}></span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Inbox;
