import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SEOProvider, Analytics } from "./components/SEO";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SEOProvider>
      <Analytics />
      <App />
    </SEOProvider>
  </React.StrictMode>,
);
