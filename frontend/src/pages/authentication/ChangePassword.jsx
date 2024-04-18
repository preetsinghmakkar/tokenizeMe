import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { UserIdState } from "../../atom/userAtom";

const ChangePassword = () => {
  const userId = useRecoilValue(UserIdState);

  const [formData, setFormData] = useState({ password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [lastPass, setLastPass] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit form data
    console.log(formData);

    checkLastPassword();
  };

  const checkLastPassword = async () => {
    try {
      const res = await fetch(
        `/api/users/profile/settings/${userId}/checkPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (data.error) {
        console.log("Error : ", data.error);
        return;
      }

      console.log("DATA", data);

      setLastPass(data);
      setFormData(data);
    } catch (error) {
      console.log("ERROR : ", error);
    }
  };

  return (
    <div className="mx-auto max-w-lg mt-10 p-8 bg-white rounded-lg shadow-lg">
      {lastPass ? (
        <CreateNewPassword />
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-8 text-center">
            Change Password
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Last Password"
                className="block w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-3"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 rounded-md text-white font-semibold hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;

const CreateNewPassword = () => {
  const userId = useRecoilValue(UserIdState);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    Pass: "",
    confirmPass: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleInputs = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();

    UpdateUser();
  };

  const UpdateUser = async () => {
    try {
      const res = await fetch(
        `/api/users/profile/settings/${userId}/changepassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const resData = await res.json();

      if (resData.error) {
        console.log("Error : ", resData.error);
        return;
      }

      if (resData.message) {
        console.log("Password Updated");
      }
    } catch (error) {
      console.log("ERROR : ", error);
    }
  };

  const validate = () => {
    if (!data.Pass) {
      console.log("Password is Required");
    }
    if (!data.confirmPass) {
      console.log("Confirm Password is Required");
    }
    if (data.Pass !== data.confirmPass) {
      console.log("Entered Passwords are not Same");
    }
  };

  return (
    <div className="mx-auto max-w-lg mt-10 p-8 bg-white rounded-lg shadow-lg">
      <div>
        <h1 className="text-3xl font-bold mb-8 text-center">
          Create New Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center">
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
            <input
              type={showPassword ? "text" : "password"}
              id="Pass"
              name="Pass"
              value={data.Pass}
              onChange={handleInputs}
              placeholder="New Password"
              className="block w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-3"
            />
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPass"
              name="confirmPass"
              value={data.confirmPass}
              onChange={handleInputs}
              placeholder="Confirm Password"
              className="block w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 rounded-md text-white font-semibold hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};
