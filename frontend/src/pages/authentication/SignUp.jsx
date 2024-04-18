import React, { useState } from "react";
import CreateProfile from "./CreateProfile";
import { useRecoilValue } from "recoil";
import { authComponentState } from "../../atom/authComponentState";
import { useSetRecoilState } from "recoil";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileimage:
      "https://res.cloudinary.com/do5krinsp/image/upload/v1713189992/dgl4kbrpnwyclyniz2hl.jpg",
    bio: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);

  const authComponent = useRecoilValue(authComponentState);
  const setAuthComponent = useSetRecoilState(authComponentState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();

    try {
      const res = await axios.post("/api/users/signup", formData);
      const data = await res.data;

      if (data.error) {
        console.log(data.error);
        return;
      }

      setDataSubmitted(true);

      localStorage.setItem("tokenizeMe", JSON.stringify(data));
      setFormData(data);
    } catch (error) {
      toast.error("Username or Email Already Exists");
      <ToastContainer />;
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.fullname.trim()) {
      errors.fullname = "Full Name is required";
      isValid = false;
    }

    if (!formData.username.trim()) {
      errors.username = "User Name should is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(errors);
    if (isValid) {
      setIsSubmitting(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white shadow-md rounded-md ">
      {authComponent === "SignUp" ? (
        <div>
          {dataSubmitted ? (
            <CreateProfile />
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Join TOKENIZEME</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    placeholder="john"
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className={`mt-1 p-2 w-full border rounded-md ${
                      errors.fullname ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.fullname && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullname}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    User Name
                  </label>
                  <input
                    placeholder="john134"
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`mt-1 p-2 w-full border rounded-md ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    placeholder="john@gmail.com"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 p-2 w-full border rounded-md ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`mt-1 p-2 w-full border rounded-md ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`mt-1 p-2 w-full border rounded-md ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
              <p className="mt-4 text-sm text-gray-800 text-center">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setAuthComponent("SignIn")}
                  className="text-blue-500 hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          )}
        </div>
      ) : (
        <SignUp />
      )}
    </div>
  );
};

export default SignUp;
