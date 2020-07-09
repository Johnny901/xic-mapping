import React from "react";
import { Link } from "react-router-dom";
import {} from "@material-ui/core";

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <list>
        <ul>
          <Link to="/xic-codes">XIC codes</Link>
        </ul>
        <ul>
          <Link to="/xic-codes-copy">XIC codes Copy</Link>
        </ul>
        <ul>
          <Link to="/xic-codes-example">XIC codes Example</Link>
        </ul>
      </list>
    </div>
  );
}
