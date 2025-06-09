import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import reportWebVitals from "./reportWebVitals";
import "../src/index.css";
import "../src/styles/variables.css"
import { BrowserRouter } from "react-router-dom";

const basename = process.env.PUBLIC_URL || '';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
