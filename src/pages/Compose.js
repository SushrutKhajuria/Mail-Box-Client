// src/pages/Compose.js
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Container, Form, Button } from "react-bootstrap";
import { auth } from "../firebase";
import { formatEmail } from "../services/authService";
import axios from "axios";

const Compose = () => {
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

 const sendMailHandler = async (e) => {
  e.preventDefault();

  const bodyHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const senderEmail = auth.currentUser?.email;
  if (!senderEmail) {
    alert("You must be logged in to send mail.");
    return;
  }

  const mailObject = {
    from: senderEmail,
    to: toEmail,
    subject,
    body: bodyHtml,
    date: new Date().toISOString(),
    read: false,
  };

  const formattedReceiver = formatEmail(toEmail);
  const formattedSender = formatEmail(senderEmail);

  try {
    const token = await auth.currentUser.getIdToken();

    await axios.post(
      `https://mail-box-client-7fb43-default-rtdb.firebaseio.com/users/${formattedReceiver}/inbox.json?auth=${token}`,
      mailObject
    );

    await axios.post(
      `https://mail-box-client-7fb43-default-rtdb.firebaseio.com/users/${formattedSender}/sent.json?auth=${token}`,
      mailObject
    );

    alert("Mail sent successfully!");
    setToEmail("");
    setSubject("");
    setEditorState(EditorState.createEmpty());

  } catch (err) {
    console.log("🔥 ERROR sending mail:", err.message);
    alert("Failed to send mail.");
  }
};


  return (
    <Container className="mt-5" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Compose Mail</h2>
      <Form onSubmit={sendMailHandler}>
        <Form.Group className="mb-3">
          <Form.Label>To</Form.Label>
          <Form.Control
            type="email"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={setEditorState}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Send</Button>
      </Form>
    </Container>
  );
};

export default Compose;
