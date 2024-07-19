import React from "react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";

import "react-toastify/dist/ReactToastify.css"; 

// Create a root instance using createRoot
const root = createRoot(document.getElementById("root"));

// Render your application using the root instance
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);
