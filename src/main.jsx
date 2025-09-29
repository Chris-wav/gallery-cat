import CatsProvider from "./components/Context/CatsProvider";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <CatsProvider>
    <App />
  </CatsProvider>
);
