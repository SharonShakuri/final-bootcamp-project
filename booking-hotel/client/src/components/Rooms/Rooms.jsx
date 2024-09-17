import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const Rooms = ({
  ameneties,
  price,
  roomAmeneties,
  capacity,
  staying,
  checkin,
  checkout,
  people,
  hotelId,
  hotelName
}) => {
  const { isDarkMode } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const reserveClick = () => {
    navigate(`/personaldetails/${hotelId}`, {
      state: {
        staying,
        checkin,
        checkout,
        people,
        hotelName,
        roomType,
        price,
        roomAmeneties
      },
    });
  };

  const amenetiesList = roomAmeneties ? roomAmeneties.split(",") : [];
  let parts = ameneties.room_type.split(" - ");
  const roomType = parts[0];

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="div w-[80%] max-w-6xl mx-auto my-8 p-4 border rounded-lg shadow-lg">
        <div className="flex justify-between">
          <div className="flex flex-col w-[40%] border-r pr-4">
            <div className="text-center">
              <h2 className="text-lg font-bold text-orange-600">{parts[0]}</h2>
            </div>

            <div className="mt-4 flex justify-between">
              <ul className="space-y-2 flex flex-col items-center">
                {amenetiesList.map((amenity, index) => (
                  <li key={index}>
                    <i className="fas fa-check"></i> {amenity.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col w-[20%] border-r pr-4 items-center">
            <h1 className="text-lg text-orange-500 font-bold mb-2">Guest</h1>
            <div className="flex items-center justify-center mt-7">
              <i className="fas fa-users text-3xl"></i>
              <div className="ml-2 flex flex-col items-center">
                <span className="text-lg">{capacity}</span>
              </div>
            </div>
          </div>

          <div className="flex w-[20%] border-r pr-4 flex-col items-center text-center">
            <h1 className="text-lg text-orange-500 font-bold">
              Price for one night
            </h1>
            <div className="mt-7">
              <p className="text-lg font-bold">$ {price}</p>
            </div>
          </div>

          <div className="flex w-[20%] border-r pr-4">
            <ul className="space-y-2">
              <ul className="space-y-2">
                <li className="text-orange-800 h2">
                  <i className="fas fa-check h2"></i> Free cancellation
                </li>
                <li className="text-orange-800 h2">
                  <i className="fas fa-check"></i> {parts[1]}
                  {roomAmeneties.Breakfast}
                </li>
              </ul>
            </ul>
          </div>

          <div className="pl-[1%] text-center">
            <button
              onClick={reserveClick}
              className="bg-orange-400 hover:bg-orange-700 text-white p-2 rounded-lg w-full"
            >
              reserve
            </button>
            <p className="mt-2 text-sm text-gray-600">
              ● Confirmation is immediate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
