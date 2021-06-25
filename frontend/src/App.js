import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container } from "react-bootstrap";
import HomePage from "./screen/HomePage";
import VerifyEmail from "./screen/VerifyEmail";

const App = () => {
  return (
    <Router>
      <Container>
        <Route path="/" component={HomePage} exact />

        <Route path="/verify/:ref" component={VerifyEmail} exact />
      </Container>
    </Router>
  );
};

export default App;
