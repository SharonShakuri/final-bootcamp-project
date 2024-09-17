import { useState, useEffect } from "react";
import axios from "axios";
import { HotelCard } from "../components/HotelCard/HotelCard";

export const ExamplePage = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/hotels");
        setHotels(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div>
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.hotel_id}
          image="/img/small.jpg"
          name={hotel.hotel_name}
          amenities={hotel.hotel_amenities}
          description={`Located in ${hotel.city}, ${hotel.city_center} meters from the center and malls.`}
          rating={`${hotel.rating} Good`}
          price={hotel.min_price}
        />
      ))}
    </div>
  );
};
