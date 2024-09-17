import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setIsDarkMode } from "../../store/store";

export const Footer = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.user);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <footer className="bg-gray-400 text-black p-8 w-full mt-10 div4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-4">Social Media</h2>
            <p className="mb-6">
              Connect to Your Social Media and tell Your Follower More About Us{" "}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/"
                className="text-black hover:text-blue-500"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://x.com/?mx=2"
                className="text-black hover:text-blue-500"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="https://www.instagram.com/"
                className="text-black hover:text-pink-500"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.linkedin.com/"
                className="text-black hover:text-blue-500"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
            <ul>
              <li className="mb-2">📞 077-412-3211</li>
              <li className="mb-2">📞 077-412-3211</li>
              <li className="mb-2">✉️ info@iitc.co.il</li>
              <li className="mb-2">📍 The Snail 3, Ramat Gan</li>
            </ul>
          </div>

          {/* Explore Section */}
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-4">Explore</h2>
            <ul>
              <li className="mb-2">➤ Home</li>
              <li className="mb-2">➤ About-Us</li>
              <li className="mb-2">➤ Service</li>
              <li className="mb-2">➤ Rooms</li>
              <li className="mb-2">➤ Hotels List</li>
              <li className="mb-2">➤ Contact-Us</li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 searchable">
              Our Promise
            </h2>
            <p className="mb-4 text-xl text-center font-['Franklin_Gothic_Medium',_'Arial_Narrow',_Arial,_sans-serif]">
              "Experience luxury and comfort like never before. Let us take care
              of your stay, while you create memories that last a lifetime."
            </p>
            <img
              src="/img/logo.jpg"
              alt="Hotel Image"
              className="h-[100px] bg-white rounded-[10px] "
            />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-700 pt-4 ">
          <strong className="text-black h2">
            IITC Collage © 2024. The Final Project
          </strong>
          <p className="text-black h2">
            Made With <span className="text-red-500 h2">❤️</span> by Team Daniel
            , Philiph , Sharon
          </p>
        </div>
      </footer>
    </div>
  );
};

