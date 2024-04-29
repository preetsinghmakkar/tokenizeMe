import React, { useState } from "react";
import { AiFillCiCircle } from "react-icons/ai";
import { ConnectButton } from "web3uikit";
import { useMoralis } from "react-moralis";
const CreateToken = () => {
  const [formData, setFormData] = useState({
    tokenName: "",
    tokenSymbol: "",
    tokenAmount: "",
  });

  const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis();
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "tokenAmount") {
      // Ensure tokenAmount is not less than 0
      value = Math.max(0, value);
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., call a function to create the token)
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center bg-gradient-to-b from-blue-400 to-indigo-600 relative">
      <div className="max-w-md w-full lg:w-auto lg:max-w-none bg-white shadow-lg rounded-lg p-8 z-10">
        {isWeb3Enabled ? (
          <div>
            <div className="mb-10">
              <ConnectButton moralisAuth={false} />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Create ERC20 Token
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="tokenName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Token Name
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <input
                    type="text"
                    id="tokenName"
                    name="tokenName"
                    value={formData.tokenName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-none focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="tokenSymbol"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Token Symbol
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <input
                    type="text"
                    id="tokenSymbol"
                    name="tokenSymbol"
                    value={formData.tokenSymbol}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-none focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="tokenAmount"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Token Amount
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <input
                    type="number"
                    id="tokenAmount"
                    name="tokenAmount"
                    value={formData.tokenAmount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-none focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                <AiFillCiCircle className="mr-2 text-xl animate-spin-slow" />{" "}
                Create Token
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Create ERC20 Token
            </h2>
            <p className="text-lg text-gray-800 font-semibold text-center">
              Let's get started by connecting your account.
            </p>
            <div className="flex items-center justify-center">
              <ConnectButton moralisAuth={false} />
              {/* <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-md flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                <FaUserCircle className="mr-2 text-xl" /> Connect Account
              </button> */}
            </div>
            <p className="text-sm text-gray-600 text-center">
              By connecting your account, you'll unlock exclusive features and
              benefits. Don't worry, we respect your privacy and security.
            </p>
          </div>
        )}
      </div>
      <div className="loader lg:ml-8 mt-8 lg:mt-0">
        <div className="loader_cube loader_cube--color"></div>
        <div className="loader_cube loader_cube--glowing"></div>
      </div>
    </div>
  );
};

export default CreateToken;

// CSS styles
const styles = `
.loader {
  width: 150px;
  height: 150px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader_cube {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 30px;
}

.loader_cube--glowing {
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.loader_cube--color {
  z-index: 1;
  filter: blur(2px);
  background: linear-gradient(135deg, #1afbf0, #da00ff);
  animation: loadtwo 2.5s ease-in-out infinite;
}

@keyframes loadtwo {
  50% {
    transform: rotate(-80deg);
  }
}
`;

// Dynamically inject CSS styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
