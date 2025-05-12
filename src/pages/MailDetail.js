// src/pages/MailDetail.js
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { auth } from "../firebase";
import { formatEmail } from "../services/authService";
import Header from "../components/Header";
import useApi from "../hooks/useApi";

const MailDetail = () => {
  const { mailId } = useParams();
  const [mail, setMail] = useState(null);
  const navigate = useNavigate();
  const { getData, patchData } = useApi();

  useEffect(() => {
    const fetchAndMarkAsRead = async () => {
      const userEmail = auth.currentUser?.email;
      const formattedEmail = formatEmail(userEmail);
      const token = await auth.currentUser.getIdToken();

      const inboxPath = `https://mail-box-client-7fb43-default-rtdb.firebaseio.com/users/${formattedEmail}/inbox/${mailId}.json?auth=${token}`;

      try {
        const data = await getData(inboxPath);
        setMail(data);

        if (!data.read) {
          await patchData(inboxPath, { read: true });
        }
      } catch (err) {
        console.error("Error loading mail:", err.message);
      }
    };

    fetchAndMarkAsRead();
  }, [mailId]);

  if (!mail) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <Container className="mt-4">
        <h3>{mail.subject}</h3>
        <p><strong>From:</strong> {mail.from}</p>
        <p><strong>To:</strong> {mail.to}</p>
        <div dangerouslySetInnerHTML={{ __html: mail.body }} />
        <Button variant="secondary" className="mt-3" onClick={() => navigate("/inbox", { replace: true })}>
          ⬅ Back to Inbox
        </Button>
      </Container>
    </>
  );
};

export default MailDetail;
