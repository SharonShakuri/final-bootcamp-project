// SET @hotel_id = (SELECT id FROM hotels WHERE name = 'Hotel California');

// -- Insert sample reviews with correct hotel_id
// INSERT INTO reviews (user_id, hotel_id, title, description, overall_rating, date_posted, staff_rating, amenities_rating, hygiene_rating, guest_comfort_rating, value_proposition_rating, location_rating, free_wifi_rating)
// VALUES
// (1, @hotel_id, 'Great Stay', 'The hotel was amazing with great amenities.', 8.5, '2024-09-01', 9.0, 8.0, 8.5, 8.5, 8.0, 9.0, 7.5),
// (2, @hotel_id, 'Good but Room for Improvement', 'The stay was generally good but could use some improvements.', 7.0, '2024-09-02', 7.5, 7.0, 6.5, 7.0, 6.5, 8.0, 6.0),
// (3, @hotel_id, 'Fantastic Experience', 'A truly fantastic experience with excellent service.', 9.0, '2024-09-03', 9.5, 9.0, 9.0, 9.0, 9.0, 9.5, 8.5),
// (4, @hotel_id, 'Average Stay', 'The stay was average, nothing too special.', 6.5, '2024-09-04', 6.0, 6.5, 7.0, 6.5, 6.5, 7.0, 6.0);

// -- Calculate the average overall rating
// SET @average_rating = (SELECT AVG(overall_rating) FROM reviews WHERE hotel_id = @hotel_id);

// -- Update the hotel's rating with the calculated average
// UPDATE hotels SET rating = @average_rating WHERE id = @hotel_id;
