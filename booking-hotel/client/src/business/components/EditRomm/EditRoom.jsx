import React, { Children } from "react";
import { useSelector } from "react-redux";

export const EditRoom = ({
  ameneties,
  people,
  price,
  roomAmeneties,
  priceDescription,
  staying,
}) => {
  ameneties = ameneties || {
    capacity: 1,
    air: "Air conditioning",
    roomSize: "30 m²",
    wifi: "Free Wifi",
    screen: "Flat-screen TV",
    pension_type: "Full pension",
    is_occupied: "Room available",
    view: "Sea view, City view",
    bathroom: "Attached bathroom",
    kitchen: "Private kitchen",
  };
  roomAmeneties = {
    cancellation: " Free cancellation",
    Breakfast: "Breakfast included in the price",
    dinner: "dinner iclude in price",
  };

  people = {
    Adult: 4,
    Children: 0,
  };
  price = price || 2268;

  staying = "6 nights";

  priceDescription = priceDescription || "Includes taxes and fees";

  const { isDarkMode } = useSelector((state) => state.user);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="div w-[80%] max-w-6xl mx-auto my-8 p-4 border rounded-lg shadow-lg">
        <div className="flex justify-between div">
          <div className="flex flex-col w-[40%] border-r pr-4 div ">
            <div className="text-center div ">
              <h2 className="text-lg font-bold text-orange-600 h2 ">Rooms</h2>
            </div>

            <div className="mt-4 flex justify-between">
              <ul className="space-y-2 flex flex-col items-center">
                <li>
                  <i className="fas fa-bed h1"></i> {ameneties.capacity} full
                  bed
                </li>
                <li>
                  <i className="fas fa-home"></i> {ameneties.roomSize}
                </li>
                <li>
                  <i className="fas fa-utensils"></i> {ameneties.kitchen}
                </li>
                <li>
                  <i className="fas fa-bath"></i> {ameneties.bathroom}
                </li>
                <li>
                  <i className="fas fa-water"></i> {ameneties.view}
                </li>
              </ul>
              <ul className="space-y-2 flex flex-col items-center">
                <li>
                  <i className="fas fa-snowflake"></i> {ameneties.air}
                </li>
                <li>
                  <i className="fas fa-tv"></i> {ameneties.screen}
                </li>
                <li>
                  <i className="fas fa-wifi"></i> {ameneties.wifi}
                </li>
                <li>
                  <i className="fas fa-volume-mute"></i> Soundproof
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-[20%] border-r pr-4 items-center">
            <h1 className="text-lg text-orange-500 font-bold mb-2 h2">Guest</h1>

            <div className="flex items-center justify-center mt-7">
              <i className="fas fa-users text-3xl"></i>

              <div className="ml-2 flex flex-col items-center">
                <span className="text-lg">
                  {people.Adult} Adult{people.Adult > 1 ? "s" : ""}
                </span>

                {people.Children > 0 && (
                  <span className="text-lg">
                    {people.Children} Child{people.Children > 1 ? "ren" : ""}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-[20%] border-r pr-4 flex-col items-center text-center">
            <h1 className="text-lg text-orange-500 h2  font-bold">
              Price for {staying}
            </h1>
            <div className="mt-7">
              <p className="text-lg font-bold">₪ {price}</p>
              <p className="text-sm text-gray-500 h1">{priceDescription}</p>
            </div>
          </div>

          {/* Your Choices */}
          <div className="flex w-[20%] border-r pr-4 pl-1">
            <ul className="space-y-2">
              <li className="text-orange-800 h2">
                <i className="fas fa-check h2"></i> {roomAmeneties.cancellation}
              </li>
              <li className="text-orange-800 h2">
                <i className="fas fa-check"></i>
                {roomAmeneties.Breakfast}
              </li>
            </ul>
          </div>

          <div className="pl-[1%] text-center">

            <button className="bg-orange-400 hover:bg-orange-700 text-white p-2 rounded-lg w-full">
              I'll reserve
            </button>
            <p className="mt-2 text-sm text-gray-600 h1">
              ● Confirmation is immediate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
