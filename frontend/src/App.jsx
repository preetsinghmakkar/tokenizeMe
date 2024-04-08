import React from "react";
import Navbar from "./components/header/Navbar";
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import { FiLayers, FiLock, FiSettings } from "react-icons/fi";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import homeImage from "/homeimage.jpg";

const words = `Take control of your digital assets with our user-friendly ERC20 token creation platform. Transform your ideas into reality and participate in the future of finance.`;

function App() {
  return (
    <>
      <div>
        <Navbar />
        <div className="relative h-screen overflow-hidden">
          <img
            src={homeImage}
            alt="Landing"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-60"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <p className="text-lg md:text-xl mb-8 max-w-md mx-auto">
              <span className="text-white font-medium inline-block overflow-hidden">
                <TextGenerateEffect words={words} />
              </span>
            </p>
            <button className="relative overflow-hidden w-60 h-16 text-white bg-black rounded-md flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition duration-300">
              <p className="z-10 text-lg font-bold">Connect Metamask</p>
              <div className="absolute inset-0 z-0 bg-indigo-500 origin-top-left transform -skew-y-6"></div>
            </button>
          </div>
        </div>
        <KeyFeatures />
        <WhyChooseUsSection />
        <CallToActionSection />
        <FooterSection />
      </div>
    </>
  );
}

export default App;

//Keyfeatures Section
function KeyFeatures() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-16 w-16 bg-blue-500 text-white rounded-full mb-4">
              {/* Icon */}
              <FiLayers className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Custom Token Creation
            </h3>
            <p className="text-gray-600">
              Design and create custom ERC20 tokens tailored to your specific
              needs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-16 w-16 bg-blue-500 text-white rounded-full mb-4">
              <FiLock className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
            <p className="text-gray-600">
              Ensure the security of your tokens with advanced encryption and
              authentication measures.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-16 w-16 bg-blue-500 text-white rounded-full mb-4">
              <FiSettings className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Flexible Configuration
            </h3>
            <p className="text-gray-600">
              Customize token parameters such as supply, name, and symbol with
              ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

//Why Choose Section
const WhyChooseUsSection = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              User-Friendly Interface
            </h3>
            <p className="text-gray-600">
              Our platform provides an intuitive and easy-to-use interface,
              making token creation a breeze for users of all skill levels.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Fast Deployment</h3>
            <p className="text-gray-600">
              With our streamlined process, you can deploy ERC20 tokens quickly,
              allowing you to focus on your projects without delays.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Reliable Support</h3>
            <p className="text-gray-600">
              We offer dedicated support to assist you at every step of the
              token creation process, ensuring a smooth experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

//Call To Action
const CallToActionSection = () => {
  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-600 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-white mb-8">
            Join thousands of users creating ERC20 tokens with ease.
          </p>
          <button className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

//Footer Section
const FooterSection = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Company Name</h3>
            <p className="text-gray-400">Ludhiana, India</p>
            <p className="text-gray-400">tokenizeme.com</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center">
        <p className="text-sm text-gray-400">
          &copy; 2024 TOKENIZEME. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
