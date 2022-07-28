import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/components/App";
import StoreProvider from "./app/components/StoreProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
