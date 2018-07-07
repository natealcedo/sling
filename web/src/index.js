import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history"
import store from "./store";
import App from "./containers/App";
import './styles/bootstrap.css';
import './styles/font-awesome.css';
import './styles/index.css';

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);
