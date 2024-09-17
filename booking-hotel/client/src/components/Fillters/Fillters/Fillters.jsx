import { useSelector } from "react-redux";

export const Fillters = () => {
  const { isDarkMode } = useSelector((state) => state.user);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="flex justify-center items-center div">
        <div className="bg-white shadow-lg rounded-lg w-full p-6 div ">
          <strong className="block text-lg mb-4">Meal options</strong>
          <div className="flex flex-col mb-4">
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" />
              <p className="text-gray-600 h1">Breakfast included</p>
            </div>

            <div className="flex items-start mb-2">
              <input type="checkbox" className="mr-2" />
              <div>
                <p className="text-gray-600 h1">Half Board</p>
                <p className="text-gray-400 text-sm h1">
                  Breakfast and dinner included
                </p>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <input type="checkbox" className="mr-2" />
              <div>
                <p className="text-gray-600 h1">Full Board</p>
                <p className="text-gray-400 text-sm h1">
                  Breakfast, lunch, and dinner included
                </p>
              </div>
            </div>
          </div>

          <strong className="block text-lg mb-4 h1">Property amenities</strong>
          <div className="flex flex-col mb-4">
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" />
              <p className="text-gray-600 h1">Pool</p>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" />
              <p className="text-gray-600 h1">Parking</p>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" />
              <p className="text-gray-600 h1">EV charger</p>
            </div>
          </div>

          <strong className="block text-lg mb-4 h1">Room amenities</strong>
          <div className="flex flex-col mb-4">
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" />
              <p className="text-gray-600 h1">WiFi</p>
            </div>
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" />
              <p className="text-gray-600 h1">Air conditioning</p>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button className="bg-green-600  py-2 px-4 rounded-md h1">
              Reset
            </button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md ">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
