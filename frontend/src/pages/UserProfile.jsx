import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "./authentication/Logout";
import axios from "axios";
function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const [userData, setUserData] = useState({});

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutButton = () => {
    setLogout(true);
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await axios.get(`/api/users/profile`);
        const data = await res.data;
        setUserData(data);
      } catch (error) {
        console.log("ERROR:", error);
      }
    };
    getUserProfile();
  }, []);

  return (
    <div className="relative">
      <button
        className="flex items-center text-gray-800 focus:outline-none"
        onClick={toggleDropdown}
      >
        <img
          src={userData.profileimage}
          alt={userData.username}
          className="w-8 h-8 rounded-full mr-2"
        />
        <div>{userData.username}</div>
      </button>
      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
          <div className="py-1">
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
              <Link to={`/profile/settings/${userData.username}`}>
                Settings
              </Link>
            </button>
            <button
              onClick={handleLogoutButton}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              Logout
            </button>

            {logout && <Logout />}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
