import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container } from "react-bootstrap";
import HomePage from "./screen/HomePage";

const App = () => {
  return (
    <Router>
      <Container>
        <Route path="/" component={HomePage} exact />
      </Container>
    </Router>
  );
};

export default App;
