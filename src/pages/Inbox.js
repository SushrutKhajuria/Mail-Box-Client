// src/pages/Inbox.js
import { useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col, Spinner, Badge } from "react-bootstrap";
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
          setInbox(loadedInbox.reverse());
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

  const unreadCount = inbox.filter(mail => !mail.read).length;

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h3>
            📥 Your Inbox{" "}
            {unreadCount > 0 && <Badge bg="primary">Unread: {unreadCount}</Badge>}
          </h3>
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
            <ListGroup.Item
              key={mail.id}
              onClick={() => navigate(`/mail/${mail.id}`)}
              style={{ cursor: "pointer" }}
            >
              <Row>
                <Col xs="1">
                  {!mail.read && (
                    <span
                      style={{
                        height: "10px",
                        width: "10px",
                        backgroundColor: "blue",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    ></span>
                  )}
                </Col>
                <Col>
                  <strong>From:</strong> {mail.from} <br />
                  <strong>Subject:</strong> {mail.subject} <br />
                  <span dangerouslySetInnerHTML={{ __html: mail.body.slice(0, 100) + "..." }}></span>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Inbox;
