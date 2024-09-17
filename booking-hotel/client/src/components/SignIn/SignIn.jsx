import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserType, setToken } from "../../store/store";

export const SignIn = ({ onSignUpClick, onSuccess }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const transformEmail = (email) => {
    return email.toLowerCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const transformedValue = name === "email" ? transformEmail(value) : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: transformedValue,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        formData
      );
      setSuccessMessage(response.data.msg);

      sessionStorage.setItem("roomup-user", response.data.accessToken);
      sessionStorage.setItem("roomup-user-refresh", response.data.refreshToken);

      dispatch(setUserType(response.data.role));
      dispatch(setToken(response.data.accessToken));
      console.log(response.data.accessToken);

      if (onSuccess) onSuccess();

      console.log(response.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.err || "An error occurred");
    }
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="div shadow-md rounded-lg p-8 max-w-md w-full h-[430px] transition-transform transform">
        <h1 className="text-3xl font-semibold text-center mb-4">
          Welcome Back!
        </h1>
        <p className="h1 text-center mb-6">
          Sign in and start planning your dream vacation today!
        </p>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 text-center mb-4">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              className="input border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              className="input border border-gray-300 rounded-md p-3 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="btn font-semibold rounded-md p-3 w-full transition duration-300"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={onSignUpClick}
            className="text-blue-500 hover:underline w-full text-center"
          >
            Create an Account
          </button>
        </form>
      </div>
    </div>
  );
};
