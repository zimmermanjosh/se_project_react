import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import reportWebVitals from "./reportWebVitals";
import "../src/index.css";
import { BrowserRouter } from "react-router-dom";

const basename = process.env.PUBLIC_URL || '';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode basename={basename} >
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
