import React from "react";
import Navbar from "./components/header/Navbar";
import HomePage from "./pages/HomePage";
import SignIn from "./components/authentication/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const words = `Take control of your digital assets with our user-friendly ERC20 token creation platform. Transform your ideas into reality and participate in the future of finance.`;

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
