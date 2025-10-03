import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PostHogProvider } from "posthog-js/react";
import App from "./App.tsx";
import "./index.css";

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider apiKey={posthogKey}>
      <App />
    </PostHogProvider>
  </StrictMode>
);
