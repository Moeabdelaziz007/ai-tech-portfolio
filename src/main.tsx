import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode data-oid="kury6wx">
    <ErrorBoundary data-oid="d21skg6">
      <App data-oid="tobcb4i" />
    </ErrorBoundary>
  </StrictMode>,
);
