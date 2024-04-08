import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-2 relative z-10">
      <div className="antialiased bg-gray-100 dark-mode:bg-gray-900">
        <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between p-4">
              <a
                href="#"
                className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
              >
                <div class="flex items-center">
                  <div class="logo flex items-center">
                    <div class="w-12 h-12 rounded-full overflow-hidden animate-pulse">
                      <div class="w-full h-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-gradient"></div>
                    </div>
                    <div class="text-xl font-bold ml-4">TokenizeMe</div>
                  </div>
                </div>
              </a>
              <button
                className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <FiX className="w-8 h-8 md:w-6 md:h-6" />
                ) : (
                  <FiMenu className="w-8 h-8 md:w-6 md:h-6" />
                )}{" "}
                {/* Use the close icon when navbar is open */}
              </button>
            </div>
            <nav
              className={`md:flex md:justify-end md:flex-row ${
                open ? "flex" : "hidden"
              }`}
            >
              <a
                href="#"
                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                Home
              </a>
              <a
                href="#"
                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                Create Token
              </a>
              <a
                href="#"
                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                My Tokens
              </a>
              <DropdownButton />
              <button className="px-4 py-2 rounded-md border border-gray-200 bg-white text-green-800 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-20">
      <button
        className="flex items-center px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        onClick={toggleDropdown}
      >
        <span>Blog</span>
        {isOpen ? (
          <FaCaretUp className="w-5 h-5 ml-1 md:w-4 md:h-4" />
        ) : (
          <FaCaretDown className="w-5 h-5 ml-1 md:w-4 md:h-4" />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
          <ul>
            <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
              About Us
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
