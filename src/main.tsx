import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AppWalletProvider from "./AppWalletProvider";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppWalletProvider>
            <App />
        </AppWalletProvider>
    </StrictMode>
);
