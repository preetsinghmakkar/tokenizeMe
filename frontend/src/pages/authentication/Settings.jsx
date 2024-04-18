import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosPerson } from "react-icons/io";
import { RiSettings2Line } from "react-icons/ri";
import { BiParagraph } from "react-icons/bi";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { UserIdState } from "../../atom/userAtom";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Settings() {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    profileimage: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const userId = useRecoilValue(UserIdState);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await axios.get(`/api/users/profile`);
        const data = await res.data;
        setUserData(data);
      } catch (error) {
        toast.error("Unable to get your Profile");
      }
    };

    getUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the userData state with the modified values
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        profileImage: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the UpdateUser function to send updated user data to the server
    await UpdateUser();
  };

  const UpdateUser = async () => {
    try {
      const res = await axios.put(`/api/users/profile/settings/${userId}`, {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        bio: userData.bio,
        profileImage: imagePreview,
      });

      if (res) {
        toast.info("Updating...");
      }

      const data = await res.data;

      if (data.error) {
        toast.error("Error in Updating");
        return;
      }

      localStorage.setItem("tokenizeMe", JSON.stringify(data));
      setUserData(data); // Update userData state with the response data

      window.location.reload();
    } catch (error) {
      toast.error("Error in Updating User");
    }
  };

  return (
    <div className="mx-auto max-w-lg mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className=" flex items-center text-3xl font-bold mb-8 text-center">
        {" "}
        <RiSettings2Line className="mr-3" /> Settings
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center">
          <IoIosPerson className="text-gray-500 mr-3 font-bold" />
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="First Name"
            className="block w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-3"
          />
        </div>
        <div className="flex items-center">
          <AiOutlineUser className="text-gray-500 mr-3" />
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Last Name"
            className="block w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-3"
          />
        </div>
        <div className="flex items-center">
          <AiOutlineMail className="text-gray-500 mr-3" />
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            className="block w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-3"
          />
        </div>
        <div className="flex items-center">
          <Link
            to={`/profile/settings/${userData.username}/changepassword`}
            className="w-full py-3 bg-gray-200 rounded-md text-gray-800 font-semibold hover:bg-gray-300 transition duration-300 text-center"
          >
            Change Password
          </Link>
        </div>
        <div className="flex items-center">
          <BiParagraph className="text-gray-500 mr-3" />
          <textarea
            id="bio"
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            placeholder="Bio"
            rows="3"
            className="block w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-3 resize-none"
          ></textarea>
        </div>

        <div className="flex items-center">
          <h2 className="text-lg font-semibold mr-4">Change Profile Picture</h2>

          {imagePreview ? (
            <div className="flex justify-center mt-4">
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="rounded-full h-20 w-20 object-cover"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="profile-image" className="cursor-pointer">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 hover:bg-gray-300">
                  <BiImageAdd className="text-gray-400 w-16 h-16" />
                </div>
                <input
                  type="file"
                  id="profile-image"
                  name="profileImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 rounded-md text-white font-semibold hover:bg-blue-600 transition duration-300"
        >
          Save Changes
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Settings;
