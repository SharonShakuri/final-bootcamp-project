import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import { Rooms } from "../../../components/Rooms/Rooms";

export const HotelPage = () => {
  const { isDarkMode } = useSelector((state) => state.user);
  const { hotelId } = useParams();
  const location = useLocation();
  const { state } = location;
  const { vacation, checkin, checkout, people, images } = state || {};

  const [hotelData, setHotelData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/hotels/${hotelId}`
        );
        setHotelData(response.data.hotel);
        setReviews(response.data.reviews);
        setRooms(response.data.rooms);
        console.log(response.data.hotel);
        console.log(response.data.reviews);
        console.log(response.data.rooms);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (!hotelData) {
    return <div>Loading...</div>;
  }

  const { hotel_name, hotel_amenities, description } = hotelData;

  const hotel_amenitiesArray = hotel_amenities.split(",");

  const calculateAverageRatings = (reviews) => {
    const categories = {
      staff: 0,
      facilities: 0,
      cleanliness: 0,
      comfort: 0,
      valueForMoney: 0,
      location: 0,
      freeWifi: 0,
    };

    const count = reviews.length;

    reviews.forEach((review) => {
      categories.staff += review.rating.staff || 0;
      categories.facilities += review.rating.facilities || 0;
      categories.cleanliness += review.rating.cleanliness || 0;
      categories.comfort += review.rating.comfort || 0;
      categories.valueForMoney += review.rating.valueForMoney || 0;
      categories.location += review.rating.location || 0;
      categories.freeWifi += review.rating.freeWifi || 0;
    });
    console.log(reviews);
    // Calculate average
    Object.keys(categories).forEach((category) => {
      categories[category] = count > 0 ? categories[category] / count : 0;
    });

    return categories;
  };

  const averageRatings = calculateAverageRatings(reviews);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const openReviewPopup = () => setIsReviewOpen(true);
  const closeReviewPopup = () => setIsReviewOpen(false);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="bg p-4">
        <div className="mx-auto max-w-screen-lg rounded-md">
          <h1 className="text-2xl font-bold mb-4">{hotel_name}</h1>
          <div className="flex flex-wrap -mx-1">
            <div className="w-full md:w-[55%] p-1">
              <img
                src={images[0]}
                alt={name}
                className="rounded-md w-full h-auto object-cover"
                style={{ maxHeight: "300px" }}
              />
            </div>
            <div className="w-full md:w-[45%] flex flex-col p-1">
              <div className="relative mb-2">
                <img
                  src={images[1]}
                  alt="hotel image 2"
                  className="rounded-md w-full h-auto object-cover"
                  style={{ maxHeight: "145px" }}
                />
              </div>
              <div className="relative">
                <img
                  src={images[2]}
                  alt="hotel image 3"
                  className="rounded-md w-full h-auto object-cover"
                  style={{ maxHeight: "145px" }}
                />
              </div>
            </div>
            {images.slice(3, 8).map((image, index) => (
              <div className="w-1/5 p-1 relative" key={index}>
                <div className="relative">
                  <img
                    src={image}
                    alt={`hotel image ${index + 4}`}
                    className="rounded-md w-full h-auto object-cover"
                    style={{ maxHeight: "100px" }}
                  />
                  {index === 4 && (
                    <div
                      className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex justify-center items-center cursor-pointer"
                      onClick={openPopup}
                    >
                      <span className="text-white text-xl font-bold">
                        +{images.length - 8}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 mb-4">
            <div
              className="border-t border-gray-300 mx-auto"
              style={{ width: "calc(100% - 2rem)", maxWidth: "100%" }}
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-center">
              <p className="text-center text-[#F97316] font-semibold">
                {hotel_amenitiesArray.join(" | ")}
              </p>
            </div>
            <div className="mt-8">
              <p className="text-lg">
                What does your family love to do on vacation? At the Astral
                Nirvana Club hotel, part of the Astral Hotels family, we've got
                it all: some of the biggest suite rooms in town, outdoor and
                indoor heated pools, water fun for kids and adults, delicious
                breakfasts, daily afternoon coffee and cake, and plenty of
                surprises to level up your stay. There's always something going
                on here—fun activities, exciting shows, tasty snacks, or
                thrilling attractions. With so much to do, you might not want to
                leave! But if you do, it's an easy walk to the promenade, Mall
                Hayam shopping center, beach, cinema, and lots of restaurants
                and cafes. In between all the fun, our comfy and luxurious
                suites are waiting for you, packed with everything you and your
                family could want for the perfect stay. Our staff is ready to
                fulfill any special requests, so you can truly relax and enjoy
                your time here.
              </p>
            </div>

            <div className="reviews mt-8">
              <h2 className="text-xl font-bold mb-4">Guest Reviews</h2>
              <button
                className="btn px-4 py-2 rounded-md"
                onClick={openReviewPopup}
              >
                Show All Reviews
              </button>
            </div>
            <div className="rooms mt-8">
              <h2 className="text-xl font-bold mb-4">Available Rooms</h2>
              <div className="flex flex-col">
                {rooms.length > 0 ? (
                  rooms
                    .filter((room) => room.capacity >= people)
                    .map((room) => (
                      <Rooms
                        key={room.room_id}
                        ameneties={room}
                        price={room.price}
                        roomAmeneties={room.room_amenities}
                        capacity={room.capacity}
                        staying={vacation}
                        checkin={checkin}
                        checkout={checkout}
                        people={people}
                        hotelId={hotelId}
                        hotelName={hotel_name}
                      />
                    ))
                ) : (
                  <p>No rooms available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup for Images */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="relative p-4 rounded-md max-w-3xl mx-auto bg-white">
            <button
              className="absolute top-0 right-0 m-2 text-lg"
              onClick={closePopup}
            >
              &times;
            </button>
            <div className="flex flex-wrap">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`hotel image ${index + 1}`}
                  className="w-full md:w-1/4 p-1"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Popup for Reviews */}
      {isReviewOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="p-6 rounded-md max-w-3xl mx-auto relative div">
            <button
              className="absolute top-0 right-0 m-2 text-lg"
              onClick={closeReviewPopup}
            >
              &times;
            </button>
            <div className="review-popup">
              <h3 className="text-xl font-bold mb-4">All Reviews</h3>

              {/* Rating Bars */}
              <div className="mt-8">
                <h4 className="text-lg font-bold mb-4">Rating Breakdown</h4>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(averageRatings).map(([category, score]) => (
                    <div key={category} className="flex-1 min-w-[150px] mb-4">
                      <div className="flex justify-between mb-1">
                        <span>
                          {category.replace(/([A-Z])/g, " $1").toUpperCase()}
                        </span>
                        <span>{score.toFixed(1)}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded">
                        <div
                          className="bg-[#F97316] h-full"
                          style={{ width: `${score * 10}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="text-lg font-bold">
                      {review.reviewer} ({review.country})
                    </h4>
                    <p className="text-sm">
                      Stayed: {review.stay_duration} - {review.date_posted}
                    </p>
                    <p className="font-semibold">
                      Score: {review.overall_rating}/10
                    </p>
                    <p>{review.description}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
