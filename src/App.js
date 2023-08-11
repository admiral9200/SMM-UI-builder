import React from "react";
import { Route, Switch } from "react-router";
import Documentation from "./pages/Documentation";
import Homepage from "./pages/Homepage";
import "./pages/pagesStyles/app.scss";
const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/documentation">
          <Documentation />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
