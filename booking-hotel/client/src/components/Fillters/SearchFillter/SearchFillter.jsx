import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";

export const SearchFilter = ({ className = "" }) => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [vacation, setVacation] = useState(0);
  const [hidden, setHidden] = useState(true);
  const [formData, setFormData] = useState({
    country: "",
    startDate: "",
    endDate: "",
    people: 1,
    adults: 1,
    children: 0,
    vacationTime: vacation,
  });

  const showDetails = () => setHidden(!hidden);

  const handleCountryChange = (input) => {
    const filtered = countries.filter((country) =>
      country.label.toLowerCase().startsWith(input.toLowerCase())
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: input,
    }));
    setFilteredCountries(filtered);
  };

  // Update adult and form data
  const handleAdultIncrease = () => {
    setAdult((prev) => {
      const updated = prev + 1;
      setFormData((prevFormData) => ({
        ...prevFormData,
        adults: updated,
        people: updated + children,
      }));
      return updated;
    });
  };

  const handleAdultDecrease = () => {
    setAdult((prev) => {
      const updated = Math.max(prev - 1, 1);
      setFormData((prevFormData) => ({
        ...prevFormData,
        adults: updated,
        people: updated + children,
      }));
      return updated;
    });
  };

  const handleChildrenIncrease = () => {
    setChildren((prev) => {
      const updated = prev + 1;
      setFormData((prevFormData) => ({
        ...prevFormData,
        children: updated,
        people: updated + adult,
      }));
      return updated;
    });
  };

  const handleChildrenDecrease = () => {
    setChildren((prev) => {
      const updated = Math.max(prev - 1, 0);
      setFormData((prevFormData) => ({
        ...prevFormData,
        children: updated,
        people: updated + adult,
      }));
      return updated;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "startDate" || name === "endDate") {
      const startDate =
        name === "startDate" ? new Date(value) : new Date(formData.startDate);
      const endDate =
        name === "endDate" ? new Date(value) : new Date(formData.endDate);

      if (startDate && endDate && endDate > startDate) {
        const timeDifference = endDate - startDate;
        const vacationDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        setVacation(vacationDays);

        setFormData((prevFormData) => ({
          ...prevFormData,
          vacationTime: vacationDays,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.people ||
      !formData.country ||
      !formData.endDate ||
      formData.startDate === null
    ) {
      alert("Please fill out all fields");
    } else {
      navigate(
        `/example2?country=${encodeURIComponent(
          formData.country
        )}&checkin=${encodeURIComponent(
          formData.startDate
        )}&checkout=${encodeURIComponent(formData.endDate)}&people=${
          formData.people
        }&vacation=${formData.vacationTime}`
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col p-4 bg-white rounded-lg shadow-md ${className}`}
    >
      <h2 className="text-4xl font-semibold text-black text-center mb-2">
        Hotel Search
      </h2>
      <strong className="text-center text-black mb-6 text-2xl">
        Order your dream vacation now!
      </strong>
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            style={{ height: "50px" }}
            className="bg-gray-100 text-gray-800 w-full pl-12 pr-4 border rounded-lg border-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-orange-500 transition duration-300 ease-in-out"
            placeholder="Enter country"
            name="country"
            value={formData.country}
            onChange={(e) => {
              handleInputChange(e);
              handleCountryChange(e.target.value);
            }}
          />
          <i className="fas fa-globe-americas absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg"></i>
        </div>

        <div className="relative flex-1">
          <input
            type="date"
            style={{ height: "50px" }}
            className="bg-gray-100 text-gray-800 w-full pl-12 pr-4 border rounded-lg border-gray-300 focus:outline-none focus:border-orange-500 transition duration-300 ease-in-out"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />
          <i className="fas fa-calendar-day absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg"></i>
        </div>

        <div className="relative flex-1">
          <input
            type="date"
            style={{ height: "50px" }}
            className="bg-gray-100 text-gray-800 w-full pl-12 pr-4 border rounded-lg border-gray-300 focus:outline-none focus:border-orange-500 transition duration-300 ease-in-out"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />
          <i className="fas fa-calendar-day absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg"></i>
        </div>
      </div>

      <div className="relative mt-4">
        <button
          type="button"
          className="bg-gray-100 w-full h-[50px] pl-12 pr-4 border rounded-lg border-gray-300 flex items-center justify-between text-gray-800 focus:outline-none focus:border-orange-500 transition duration-300 ease-in-out"
          onClick={showDetails}
        >
          <span className="flex items-center gap-2">
            <i className="fas fa-user text-gray-600 text-lg"></i>
            {adult} Adult{adult > 1 && "s"}
          </span>
          <span className="flex items-center gap-2">
            <i className="fas fa-child text-gray-600 text-lg"></i>
            {children} Child{children !== 1 && "ren"}
          </span>
        </button>
        {!hidden && (
          <div className="absolute top-full left-0 w-full mt-2 p-4 border border-gray-300 bg-white rounded-lg shadow-lg z-10">
            <div className="flex items-center mb-2">
              <i className="fas fa-user text-gray-600 text-lg mr-3"></i>
              <div className="flex-grow flex justify-between items-center border border-gray-300 p-2 rounded-lg">
                <p className="text-sm">Adults</p>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={handleAdultDecrease}
                    className="bg-gray-200 p-1 rounded-full"
                  >
                    <i className="fas fa-minus text-gray-600"></i>
                  </button>
                  <span className="px-4">{adult}</span>
                  <button
                    type="button"
                    onClick={handleAdultIncrease}
                    className="bg-gray-200 p-1 rounded-full"
                  >
                    <i className="fas fa-plus text-gray-600"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <i className="fas fa-child text-gray-600 text-lg mr-3"></i>
              <div className="flex-grow flex justify-between items-center border border-gray-300 p-2 rounded-lg">
                <p className="text-sm">Children</p>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={handleChildrenDecrease}
                    className="bg-gray-200 p-1 rounded-full"
                  >
                    <i className="fas fa-minus text-gray-600"></i>
                  </button>
                  <span className="px-4">{children}</span>
                  <button
                    type="button"
                    onClick={handleChildrenIncrease}
                    className="bg-gray-200 p-1 rounded-full"
                  >
                    <i className="fas fa-plus text-gray-600"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white text-lg py-3 px-6 mt-6 rounded-lg"
      >
        Search Hotels
      </button>
    </form>
  );
};
