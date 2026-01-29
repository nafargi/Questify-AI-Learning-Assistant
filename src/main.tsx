import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("Mounting React App...");
try {
    createRoot(document.getElementById("root")!).render(<App />);
    console.log("React App render called");
} catch (error) {
    console.error("Error mounting React App:", error);
}
