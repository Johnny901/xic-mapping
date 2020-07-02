import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import Routes from "./routes";

function App() {
  return (
    <div>
      <h1>XIC Mapping appjs</h1>

      <Router>
        <Link to="/xic-codes">XIC codes</Link>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
