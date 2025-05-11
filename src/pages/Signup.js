// src/pages/Signup.js
import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { signupUser, formatEmail } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email || !password || !confirmPassword) {
      return setError("All fields are required.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      const user = await signupUser(email, password);
      console.log("User has successfully signed up");

      const formattedEmail = formatEmail(email);
      console.log("Formatted email for DB:", formattedEmail); 
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Signup</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">Signup successful!</Alert>}

        <Button variant="primary" type="submit" className="w-100">
          Sign Up
        </Button>
      </Form>

            <Row className="mt-3">
        <Col className="text-center">
          Already have an account?{" "}
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </Col>
      </Row>


    </Container>
  );
};

export default Signup;
