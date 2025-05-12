// src/pages/Inbox.js
import { useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col, Spinner, Badge } from "react-bootstrap";
import { auth } from "../firebase";
import { formatEmail } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import useApi from "../hooks/useApi";

const Inbox = () => {
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getData, deleteData } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId;

    const fetchInbox = async () => {
      try {
        const userEmail = auth.currentUser?.email;
        const token = await auth.currentUser.getIdToken();
        const formattedEmail = formatEmail(userEmail);

        const data = await getData(
          `https://mail-box-client-7fb43-default-rtdb.firebaseio.com/users/${formattedEmail}/inbox.json?auth=${token}`
        );

        if (data) {
          const loadedInbox = Object.keys(data).map((id) => ({
            id,
            ...data[id],
          })).reverse();

          const oldInboxStr = JSON.stringify(inbox);
          const newInboxStr = JSON.stringify(loadedInbox);

          if (oldInboxStr !== newInboxStr) {
            setInbox(loadedInbox);
          }
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
    intervalId = setInterval(fetchInbox, 2000);
    return () => clearInterval(intervalId);
  }, [inbox]);

  const unreadCount = inbox.filter(mail => mail.read === false).length;

  const handleDelete = async (mailId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this mail?");
    if (!confirmDelete) return;

    try {
      const token = await auth.currentUser.getIdToken();
      const formattedEmail = formatEmail(auth.currentUser.email);

      await deleteData(
        `https://mail-box-client-7fb43-default-rtdb.firebaseio.com/users/${formattedEmail}/inbox/${mailId}.json?auth=${token}`
      );

      setInbox((prev) => prev.filter((mail) => mail.id !== mailId));
    } catch (err) {
      console.error("Failed to delete:", err.message);
      alert("Failed to delete mail.");
    }
  };

  return (
    <>
      <Header />
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
              <ListGroup.Item key={mail.id} className="d-flex justify-content-between align-items-start">
                <div onClick={() => navigate(`/mail/${mail.id}`)} style={{ cursor: "pointer", flex: 1 }}>
                  <Row>
                    <Col xs="1">
                      {mail.read === false && (
                        <span style={{
                          height: "10px",
                          width: "10px",
                          backgroundColor: "blue",
                          borderRadius: "50%",
                          display: "inline-block",
                        }}></span>
                      )}
                    </Col>
                    <Col>
                      <strong>From:</strong> {mail.from} <br />
                      <strong>Subject:</strong> {mail.subject} <br />
                      <span dangerouslySetInnerHTML={{ __html: mail.body.slice(0, 100) + "..." }}></span>
                    </Col>
                  </Row>
                </div>
                <Button variant="danger" size="sm" onClick={() => handleDelete(mail.id)} className="ms-3">
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Container>
    </>
  );
};

export default Inbox;
