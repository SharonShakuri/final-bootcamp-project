import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FaCreditCard } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { format, parseISO, differenceInDays } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";

export const TransactionPage = () => {
  const { isDarkMode } = useSelector((state) => state.user);

  const location = useLocation();
  const { state } = location;
  const {
    staying,
    checkin,
    checkout,
    people,
    hotelName,
    roomType,
    roomAmeneties,
    totalPrice,
    firstName,
    lastName,
    phone,
    email,
  } = state || {};

  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("payLater");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const paypalContainerRef = useRef(null);

  useEffect(() => {
    if (paymentMethod === "payNow") {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=BAAaZsk8Xj3gQRwVdhOnUDLkUZ1JM2sRQUvGk_uMK_eby7u5sAPOj4fuWncLrm-eQxrXhuML7m4vPvRzIY&components=hosted-buttons&disable-funding=venmo&currency=ILS";
      script.onload = () => {
        if (window.paypal && paypalContainerRef.current) {
          window.paypal
            .HostedButtons({
              hostedButtonId: "9UJA2ZVLS7QYS",
            })
            .render(paypalContainerRef.current);
        }
      };
      document.body.appendChild(script);

      // Cleanup script on component unmount
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [paymentMethod]);

  const validateForm = () => {
    const newErrors = {};

    if (!cardholderName)
      newErrors.cardholderName = "Cardholder's name is required.";
    if (!cardNumber || cardNumber.length !== 16)
      newErrors.cardNumber = "Card number must be 16 digits.";
    if (!expiryDate) newErrors.expiryDate = "Expiry date is required.";
    if (!cvc || cvc.length !== 3) newErrors.cvc = "CVC must be 3 digits.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        cardholderName,
        cardNumber,
        expiryDate,
        cvc,
        paymentMethod,
      };

      console.log("Form data:", formData);
      navigate(`/confirm`, {
        state: {
          staying,
          checkin,
          checkout,
          people,
          hotelName,
          roomType,
          roomAmeneties,
          totalPrice,
          firstName,
          lastName,
          phone,
          email,
        },
      });
      // alert("Payment submitted successfully!");
    }
  };

  const amenitiesArray = roomAmeneties ? roomAmeneties.split(",") : [];

  const formattedCheckin = checkin
    ? format(parseISO(checkin), "EEE d MMM yyyy")
    : "";
  const formattedCheckout = checkout
    ? format(parseISO(checkout), "EEE d MMM yyyy")
    : "";

  const checkinDate = checkin ? parseISO(checkin) : new Date();
  const checkoutDate = checkout ? parseISO(checkout) : new Date();
  const lengthOfStay = differenceInDays(checkoutDate, checkinDate);

  return (
    <div className={`${isDarkMode ? "dark" : ""} h-[100%]`}>
      <div className="bg h-[100%]">
        <div className="max-w-4xl mx-auto p-10 ">
          <div className="border rounded-lg shadow-lg p-8 space-y-6 div ">
            <div className="border-b pb-6">
              <h2 className="font-bold text-2xl">
                {hotelName} - {roomType}
              </h2>
              <p className="text-gray-500 mt-2 h2">
                Shfifon Street 9, Eilat, 88013, Israel
              </p>
              <p className="text-[#F97316] font-medium mt-1 ">
                Very good - 8.1 / 959 reviews
              </p>
              <div className="flex items-center space-x-6 mt-3 ">
                <ul className="list-disc pl-5">
                  {amenitiesArray.map((amenity, index) => (
                    <li key={index} className="text-gray-500 h2">
                      {amenity.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-b pb-6">
              <h3 className="font-semibold text-xl">Your booking details</h3>
              <p className="mt-2 h1">
                Check-in: <strong>{formattedCheckin}</strong> from 15:00
              </p>
              <p>
                Check-out: <strong>{formattedCheckout}</strong> until 11:00
              </p>
              <p>
                Total length of stay: <strong>{lengthOfStay} nights</strong>
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="font-semibold text-xl">Your price summary</h3>
              <p className="mt-2">
                Total: <strong>${totalPrice}</strong> (Includes taxes and
                charges)
              </p>
              <p>
                Damage deposit (Fully refundable): <strong>₪200</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <h3 className="font-semibold text-xl">
                How would you like to pay?
              </h3>
              <div className="mt-4 space-y-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="payLater"
                    checked={paymentMethod === "payLater"}
                    onChange={() => setPaymentMethod("payLater")}
                    className="mr-2 "
                  />
                  Pay later
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="payNow"
                    checked={paymentMethod === "payNow"}
                    onChange={() => setPaymentMethod("payNow")}
                    className="mr-2"
                  />
                  Pay now
                </label>

                {paymentMethod === "payNow" && (
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Cardholder's Name"
                        className="border p-3 w-full rounded-md input"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                      />
                      {errors.cardholderName && (
                        <p className="text-red-500">{errors.cardholderName}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="border p-3 w-full rounded-md input"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Expiry Date"
                          className="border p-3 w-full rounded-md input"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                        {errors.expiryDate && (
                          <p className="text-red-500">{errors.expiryDate}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="CVC"
                          className="border p-3 w-full rounded-md input"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                        />
                        {errors.cvc && (
                          <p className="text-red-500">{errors.cvc}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="mt-6 bg-orange-500 text-white p-3 rounded-md w-full"
              >
                Confirm Payment
              </button>
            </form>


          </div>
        </div>
      </div>
    </div>
  );
};
