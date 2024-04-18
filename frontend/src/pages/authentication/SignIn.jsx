import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { authComponentState } from "../../atom/authComponentState";
import { useSetRecoilState, useRecoilValue } from "recoil";
import SignUp from "./SignUp";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SigninPage = () => {
  const authComponent = useRecoilValue(authComponentState);
  const setAuthComponent = useSetRecoilState(authComponentState);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signin", formData);
      setFormData(response.data);
      localStorage.setItem("tokenizeMe", JSON.stringify(response.data));
      window.location.reload();
    } catch (error) {
      toast.error("Invalid Username or Password");
    }
  };

  const handlelogin = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {authComponent === "SignIn" ? (
        <div className="min-h-screen flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-center items-center mb-8">
              <img
                src="/login_logo.jpg"
                alt="Logo"
                className="mr-4 w-12 h-12 rounded-full bg-blue-500 p-2"
              />
              <h2 className="text-3xl font-semibold text-gray-800">
                Welcome Back
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-800">
                  <b>Email</b>
                </label>
                <div className="relative">
                  <MdEmail className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.value}
                    className="w-full border-b-2 border-gray-500 py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500 bg-transparent text-gray-800 placeholder-gray-500"
                    placeholder="Enter your email"
                    required
                    onChange={handlelogin}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-800">
                  <b>Password</b>
                </label>
                <div className="relative">
                  <MdLock className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full border-b-2 border-gray-500 py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500 bg-transparent text-gray-800 placeholder-gray-500"
                    placeholder="Enter your password"
                    required
                    onChange={handlelogin}
                    value={formData.value}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors duration-300"
              >
                Sign In
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-800 text-center">
              Don't have an account?{" "}
              <button
                type="submit"
                onClick={() => setAuthComponent("SignUp")}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      ) : (
        <SignUp />
      )}
      <ToastContainer />
    </div>
  );
};

export default SigninPage;
