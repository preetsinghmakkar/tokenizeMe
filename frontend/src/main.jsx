import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { MoralisProvider } from "react-moralis";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MoralisProvider initializeOnMount={false}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </MoralisProvider>
  </React.StrictMode>
);
