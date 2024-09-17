import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const SignUp = ({ onSignInClick }) => {
  const { isDarkMode } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [tooltip, setTooltip] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const transformedValue =
      name === "firstName" || name === "lastName"
        ? capitalizeFirstLetter(value)
        : name === "email"
        ? value.toLowerCase()
        : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: transformedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/users/addUser",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error creating the user:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseEnter = (role) => {
    if (role === "Personal") {
      setTooltip("Individual account for personal use.");
    } else if (role === "Business") {
      setTooltip("Account for businesses and organizations.");
    }
  };

  const handleMouseLeave = () => {
    setTooltip("");
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="div shadow-md rounded-lg p-8 max-w-md w-full transition-transform transform">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-3 w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-3 w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="relative mb-4">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              onMouseEnter={() =>
                handleMouseEnter(
                  formData.role === "1" ? "Personal" : "Business"
                )
              }
              onMouseLeave={handleMouseLeave}
              className="input border border-gray-300 rounded-md p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">Personal</option>
              <option value="2">Business</option>
            </select>
            {tooltip && (
              <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mt-2 w-[220px] text-center rounded-xl p-2 shadow-lg opacity-100 transition-opacity duration-300">
                {tooltip}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-4 h-4 rotate-45"></span>
              </span>
            )}
          </div>
          <button
            type="submit"
            className="btn font-semibold rounded-md p-3 w-full transition duration-300"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onSignInClick}
            className="text-blue-500 hover:underline w-full text-center"
          >
            Already have an account?
          </button>
        </form>
      </div>
    </div>
  );
};
