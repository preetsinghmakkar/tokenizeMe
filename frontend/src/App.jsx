import React from "react";
import Navbar from "./components/header/Navbar";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/authentication/SignIn";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserState } from "./atom/userAtom";
import CreateToken from "./pages/CreateToken";
import Settings from "./pages/authentication/Settings";
import ChangePassword from "./pages/authentication/ChangePassword";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = useRecoilValue(UserState);

  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signin"
            element={user ? <Navigate to={"/CreateToken"} /> : <SignIn />}
          />
          <Route
            path="/CreateToken"
            element={user ? <CreateToken /> : <Navigate to={"/signin"} />}
          />
          <Route
            path="/profile/settings/:username"
            element={user ? <Settings /> : <Navigate to={"/signin"} />}
          />
          <Route
            path="/profile/settings/:username/changepassword"
            element={user ? <ChangePassword /> : <Navigate to={"/signin"} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
