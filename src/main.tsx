import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./tailwind.css";

// Enables the resilient reveal system: content is visible without JS, and
// hidden-then-revealed only when JS (and thus IntersectionObserver) is present.
document.documentElement.classList.add("js");

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
