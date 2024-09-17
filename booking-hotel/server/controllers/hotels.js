const { promisePool } = require("../db/dbPool");

const hotelController = {
  getAllHotels: async (req, res) => {
    try {
      const { country } = req.query;
      console.log(`Received country filter: ${country}`);

      let query = `
        SELECT h.id AS hotel_id, 
               h.name AS hotel_name, 
               h.rating,  
               h.x, 
               h.y, 
               h.city_center, 
               c.name AS city, 
               GROUP_CONCAT(DISTINCT ha.name) AS hotel_amenities,
               GROUP_CONCAT(DISTINCT ra.name) AS room_amenities,
               GROUP_CONCAT(DISTINCT i.image_url) AS images,
               MIN(r.price) AS min_price
        FROM hotels h
        LEFT JOIN images i ON i.hotel_id = h.id
        LEFT JOIN cities c ON h.city_id = c.id
        LEFT JOIN hotel_amenities_usage hau ON h.id = hau.hotel_id
        LEFT JOIN hotel_amenities ha ON hau.amenity_id = ha.id
        LEFT JOIN rooms r ON h.id = r.hotel_id
        LEFT JOIN room_types rt ON r.room_type = rt.id
        LEFT JOIN room_amenities_usage rau ON rt.id = rau.room_type_id
        LEFT JOIN room_amenities ra ON rau.amenity_id = ra.id
        LEFT JOIN countries cn ON c.country_id = cn.id
        WHERE cn.name = ?
        GROUP BY h.id, h.name, h.rating, h.city_center, c.name , c.name ,h.x, h.y;
      `;

      let queryMap = `
        SELECT c.latitude, 
               c.longitude 
        FROM countries c 
        WHERE c.name = ?
      `;

      const [hotelRows] = await promisePool.query(
        query,
        [country].filter(Boolean)
      );
      const [mapRows] = await promisePool.query(
        queryMap,
        [country].filter(Boolean)
      );

      res.json({
        hotels: hotelRows,
        mapCoordinates: mapRows.length > 0 ? mapRows[0] : null,
      });
    } catch (err) {
      console.error("Error fetching hotels:", err.stack);
      res.status(500).send("Internal Server Error");
    }
  },

  getHotelDetails: async (req, res) => {
    try {
      const { hotelId } = req.params;
      console.log(`Received hotelId: ${hotelId}`);

      let hotelQuery = `
      SELECT h.id AS hotel_id, 
             h.name AS hotel_name, 
             h.rating, 
             h.city_center, 
             c.name AS city, 
             GROUP_CONCAT(DISTINCT ha.name) AS hotel_amenities
      FROM hotels h
      LEFT JOIN cities c ON h.city_id = c.id
      LEFT JOIN hotel_amenities_usage hau ON h.id = hau.hotel_id
      LEFT JOIN hotel_amenities ha ON hau.amenity_id = ha.id
      WHERE h.id = ?
      GROUP BY h.id, h.name, h.rating, h.city_center, c.name;
    `;

      let reviewsQuery = `
      SELECT r.reviewer, r.country, r.date_posted, r.room_type, r.stay_duration, r.overall_rating, r.description, 
             JSON_OBJECT('staff', r.staff_rating, 'facilities', r.amenities_rating, 'cleanliness', r.hygiene_rating, 
             'comfort', r.guest_comfort_rating, 'valueForMoney', r.value_proposition_rating, 'location', r.location_rating, 'freeWifi', r.free_wifi_rating) AS rating
      FROM reviews r
      WHERE r.hotel_id = ?;
    `;

      let roomsQuery = `
      SELECT r.id AS room_id, 
         r.price, 
         rt.capacity, 
         rt.pension_type, 
         rt.name AS room_type, 
         GROUP_CONCAT(DISTINCT ra.name) AS room_amenities,
         r.is_occupied
      FROM rooms r
      LEFT JOIN room_types rt ON r.room_type = rt.id
      LEFT JOIN room_amenities_usage rau ON rt.id = rau.room_type_id
      LEFT JOIN room_amenities ra ON rau.amenity_id = ra.id
  WHERE r.hotel_id = ? AND r.is_occupied = 'No'
  GROUP BY r.id, r.price, rt.capacity, rt.pension_type, rt.name, r.is_occupied;
`;

      const [hotelRows] = await promisePool.query(hotelQuery, [hotelId]);
      const [reviewsRows] = await promisePool.query(reviewsQuery, [hotelId]);
      const [roomsRows] = await promisePool.query(roomsQuery, [hotelId]);

      if (hotelRows.length > 0) {
        res.json({
          hotel: hotelRows[0],
          reviews: reviewsRows,
          rooms: roomsRows,
        });
      } else {
        res.status(404).send("Hotel not found");
      }
    } catch (err) {
      console.error("Error fetching hotel details:", err.stack);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = { hotelController };
