import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState();

  const sendRequest = async (email) => {
    let bodyObj = { email: email };
    setLoading(true);
    const { data } = await axios.post(`/api/v1/newslatter`, bodyObj);
    setApiData(data);
    setLoading(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    sendRequest(email);
  };

  return (
    <Container>
      {apiData && console.log(apiData)}
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Sign Up for Newsletter</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" disabled={loading}>
              Subscribe
            </Button>
          </Form>

          <Row className="py-3">
            <Alert variant="danger">This is a Danger alert—check it out!</Alert>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
