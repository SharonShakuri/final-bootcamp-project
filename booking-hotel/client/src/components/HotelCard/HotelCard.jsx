import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const HotelCard = ({
  image,
  name,
  amenities,
  description,
  rating,
  price,
  hotelId,
  vacation,
  checkin,
  checkout,
  people,
  images,
  latitude,
  longitude,
}) => {
  const { isDarkMode } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(images);

  const handleViewDealClick = () => {
    navigate(`/hotelpage/${hotelId}`, {
      state: {
        vacation,
        checkin,
        checkout,
        people,
        images,
      },
    });
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="div w-[90%] h-[300px] flex border-[1px] rounded-[20px] ml-20 mt-20 overflow-hidden">
        <div className="w-[400px] h-full">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover rounded-l-[20px] border-r-[1px] border-gray-300"
          />
        </div>

        <div className="flex items-start justify-between text-left flex-col w-[400px] h-full p-6">
          <h1 className="text-3xl font-semibold font-serif">{name}</h1>
          <p className="mt-2 font-medium">{description}</p>
          <div className="mt-2 p-2 rounded-lg">
            <p className="text-lg">{amenities}</p>
          </div>
          <div className=" p-[2%] rounded-full">
            <p className="text-lg font-semibold">{rating}</p>
          </div>
        </div>

        <div className="flex justify-center items-center text-left flex-col w-[400px] h-full p-6">
          <h1>Price per night</h1>
          <h1 className="text-4xl font-bold">${price}</h1>
          <button
            onClick={handleViewDealClick}
            className="mt-6 py-2 px-6 rounded-full shadow-md transition duration-300 bg-orange-600 text-white"
          >
            View Deal
          </button>
        </div>
      </div>
    </div>
  );
};
