import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faHotel,
  faCalendarAlt,
  faDoorClosed,
  faDollarSign,
  faCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const OrderConfirmationCard = () => {
  const { isDarkMode } = useSelector((state) => state.user);

  const location = useLocation();
  const { state } = location;
  const {
    firstName,
    lastName,
    email,
    phone,
    checkin,
    checkout,
    people,
    hotelName,
    roomType,
    roomAmeneties,
    totalPrice,
  } = state || {};

  const hotel = hotelName;
  const room = roomType;
  const price = totalPrice;
  const check_in = checkin;
  const check_out = checkout;
  console.log(
    hotel,
    room,
    price,
    check_in,
    check_out,
    firstName,
    lastName,
    email,
    phone
  );

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className={`h-full bg`}>
        <div
          className={`flex justify-center items-center min-h-screen py-10 px-4 div`}
        >
          <div
            className={`relative flex flex-col max-w-lg w-full p-8 border rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105`}
          >
            <div className="flex justify-center items-center mb-6">
              <h1 className="text-4xl font-extrabold text-center tracking-wide">
                Booking Confirmed
              </h1>
              <FontAwesomeIcon
                icon={faCheck}
                className="text-green-600 ml-3 text-3xl animate-bounce"
              />
            </div>

            <div className="space-y-4 ">
              <div className=" flex flex-col items-center bg-gradient-to-r from-gray-200 to-gray-300 p-4 rounded-xl shadow-inner">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-xl mb-2 text-black"
                />
                <p className="text-lg font-medium">{`${firstName} ${lastName}`}</p>
                <p className="text-sm ">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-sm" />
                  {email}
                </p>
                <p className="text-sm">
                  <FontAwesomeIcon icon={faPhone} className="mr-2 text-sm" />
                  {phone}
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl shadow-inner text-center div">
                <p className="text-lg font-semibold text-purple-600">
                  <FontAwesomeIcon icon={faHotel} className="mr-2 text-xl" />
                  {hotel}
                </p>
                <p className="text-md">
                  <FontAwesomeIcon icon={faDoorClosed} className="mr-2" />
                  Room: {room}
                </p>
                <p className="text-md">
                  <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                  Price: {price}
                </p>
                <p className="text-md">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                  Check-In: {check_in}
                </p>
                <p className="text-md">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                  Check-Out: {check_out}
                </p>
              </div>


            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};
