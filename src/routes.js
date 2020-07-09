import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import XicCodes from "./pages/xic-codes";
import XicCodesCopy from "./pages/xic-codes-copy";
import XicCodesExample from "./pages/xic-codes-example";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/xic-codes" component={XicCodes} />
      <Route exact path="/xic-codes-copy" component={XicCodesCopy} />
      <Route exact path="/xic-codes-example" component={XicCodesExample} />
    </Switch>
  );
};

export default Routes;
