import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Signup from './Signup';
import NotFound from "../components/NotFound";

const App = () => (
  <BrowserRouter>
    <div style={{ display: 'flex', flex: 1 }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
