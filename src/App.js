import React from "react";
import { Route, Switch } from "react-router";
import WorkSpace from "./pages/WorkSpace";
import "./pages/pagesStyles/app.scss";
const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <WorkSpace />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
