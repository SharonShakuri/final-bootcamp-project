import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SearchFilter } from "../../../components/Fillters/SearchFillter/SearchFillter";
import { HotelCard } from "../../../components/HotelCard/HotelCard";
import { AllFilter } from "../../../components/Fillters/AllFilter/AllFilter";
import Map from "../../../components/Map/Map";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Hotelexample = () => {
  const { isDarkMode } = useSelector((state) => state.user);
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(Infinity);
  const [coordinates, setCoordinates] = useState([]);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const country = queryParams.get("country");
  const checkin = queryParams.get("checkin");
  const checkout = queryParams.get("checkout");
  const people = queryParams.get("people");
  const vacation = queryParams.get("vacation");

  console.log(`this is countries ${country}`);

  const fetchHotels = async (country) => {
    try {
      const response = await axios.get("http://localhost:5000/hotels", {
        params: { country: country },
      });
      const hotelsData = response.data.hotels;
      setHotels(response.data.hotels);
      setFilteredHotels(response.data.hotels);

      const coords = hotelsData.map((hotel) => ({
        id: hotel.hotel_id,
        name: hotel.hotel_name,
        position: [parseFloat(hotel.y), parseFloat(hotel.x)],
      }));
      setCoordinates(coords);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const country = queryParams.get("country");

    if (country) {
      fetchHotels(country);
    }
  }, [country]);

  useEffect(() => {
    const filtered = hotels.filter(
      (hotel) => hotel.min_price >= minPrice && hotel.min_price <= highPrice
    );
    setFilteredHotels(filtered);
  }, [minPrice, highPrice, hotels]);

  const handlePriceFilter = (min, high) => {
    setMinPrice(min);
    setHighPrice(high);
  };

  const handleSearch = (country) => {
    const params = new URLSearchParams(window.location.search);
    params.set("country", country);
    window.history.replaceState(null, "", "?" + params.toString());
    fetchHotels(country);
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""} relative`}>
      <div className="h-full w-full flex flex-col bg">
        <SearchFilter onSearch={handleSearch} />{" "}
        <div className="relative">
          <AllFilter onPriceFilter={handlePriceFilter} />
          <div className="w-full flex mt-4">
            <div className="h-full w-[50%]">
              {filteredHotels.map((hotel) => {
                let arrImg = hotel.images.split(",");
                console.log(arrImg);

                return (
                  <HotelCard
                    className="h-full"
                    key={hotel.hotel_id}
                    image={arrImg[0]}
                    name={hotel.hotel_name}
                    amenities={hotel.hotel_amenities}
                    description={`Located in ${hotel.city}, ${hotel.city_center} meters from the center and malls.`}
                    rating={`${hotel.rating} Good`}
                    price={hotel.min_price}
                    hotelId={hotel.hotel_id}
                    vacation={vacation}
                    checkin={checkin}
                    checkout={checkout}
                    people={people}
                    images={arrImg}
                  />
                );
              })}
            </div>
            <div className="relative flex h-full w-[50%] justify-center items-center z-20">
              <Map locations={coordinates} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
