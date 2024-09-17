USE booking_clone;

INSERT INTO roles (name) VALUES
('Personal'),
('Business')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO countries (name) VALUES
('United States')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO cities (name, country_id) VALUES
('New York', 1),
('San Francisco', 1),
('Chicago', 1),
('Miami', 1),
('Las Vegas', 1),
('Seattle', 1),
('Austin', 1),
('Boston', 1),
('Orlando', 1);

INSERT INTO beds (name, capacity) VALUES
('Single Bed', 1),
('Double Bed', 2),
('Queen Bed', 2),
('King Bed', 2),
('Sofa Bed', 2),
('Bunk Bed', 2),
('Twin Bed', 2);

INSERT INTO room_amenities (name) VALUES
('Wi-Fi'),
('Air Conditioning'),
('Mini Bar'),
('Safe'),
('Television');

INSERT INTO hotel_amenities (name) VALUES
('Swimming Pool'),
('Gym'),
('Spa'),
('Parking'),
('Restaurant');

ALTER TABLE pension
ADD COLUMN description TEXT;

INSERT INTO pension (name, description) VALUES
  ('Bed and Breakfast', 'Includes just the room and breakfast.'),
  ('Half Board', 'Includes room, breakfast, and one additional meal (usually dinner).'),
  ('Full Board', 'Includes room, breakfast, lunch, and dinner.'),
  ('All Inclusive', 'Includes all meals, snacks, and usually drinks (both alcoholic and non-alcoholic).'),
  ('Room Only', 'Includes just the room with no meals provided.');


-- Insert the new hotel into the hotels table
INSERT INTO hotels (name, rating, city_center, city_id)
VALUES ('Hotel California', 0, 1, (SELECT id FROM cities WHERE name = 'San Francisco'));

-- Retrieve the new hotel_id
SET @hotel_id = (SELECT id FROM hotels WHERE name = 'Hotel California');

-- Insert sample reviews with correct hotel_id
INSERT INTO reviews (user_id, hotel_id, title, description, overall_rating, date_posted, staff_rating, amenities_rating, hygiene_rating, guest_comfort_rating, value_proposition_rating, location_rating, free_wifi_rating)
VALUES
(1, @hotel_id, 'Great Stay', 'The hotel was amazing with great amenities.', 8.5, '2024-09-01', 9.0, 8.0, 8.5, 8.5, 8.0, 9.0, 7.5),
(2, @hotel_id, 'Good but Room for Improvement', 'The stay was generally good but could use some improvements.', 7.0, '2024-09-02', 7.5, 7.0, 6.5, 7.0, 6.5, 8.0, 6.0),
(3, @hotel_id, 'Fantastic Experience', 'A truly fantastic experience with excellent service.', 9.0, '2024-09-03', 9.5, 9.0, 9.0, 9.0, 9.0, 9.5, 8.5),
(4, @hotel_id, 'Average Stay', 'The stay was average, nothing too special.', 6.5, '2024-09-04', 6.0, 6.5, 7.0, 6.5, 6.5, 7.0, 6.0);

-- Calculate the average overall rating
SET @average_rating = (SELECT AVG(overall_rating) FROM reviews WHERE hotel_id = @hotel_id);

-- Update the hotel's rating with the calculated average
UPDATE hotels SET rating = @average_rating WHERE id = @hotel_id;

UPDATE `booking_clone`.`hotels` SET `user_id` = '5' WHERE (`id` = '1');

-- Insert room types with pension type
INSERT INTO room_types (name, pension_type, capacity) VALUES
-- Deluxe Room
('Deluxe Room - Bed and Breakfast', 1, 0),
('Deluxe Room - Half Board', 2, 0),
('Deluxe Room - Full Board', 3, 0),
('Deluxe Room - All Inclusive', 4, 0),
('Deluxe Room - Room Only', 5, 0),

-- Superior Room
('Superior Room - Bed and Breakfast', 1, 0),
('Superior Room - Half Board', 2, 0),
('Superior Room - Full Board', 3, 0),
('Superior Room - All Inclusive', 4, 0),
('Superior Room - Room Only', 5, 0),

-- Standard Room
('Standard Room - Bed and Breakfast', 1, 0),
('Standard Room - Half Board', 2, 0),
('Standard Room - Full Board', 3, 0),
('Standard Room - All Inclusive', 4, 0),
('Standard Room - Room Only', 5, 0);

-- Insert bed associations for Deluxe Room (2 King Beds)
-- First King Bed
INSERT INTO room_beds (room_type_id, bed_id)
SELECT id, (SELECT id FROM beds WHERE name = 'King Bed')
FROM room_types
WHERE name LIKE 'Deluxe Room%';

-- Second King Bed
INSERT INTO room_beds (room_type_id, bed_id)
SELECT id, (SELECT id FROM beds WHERE name = 'King Bed')
FROM room_types
WHERE name LIKE 'Deluxe Room%';

-- Insert bed associations for Superior Room (1 Queen Bed, 1 Double Bed)
-- Queen Bed
INSERT INTO room_beds (room_type_id, bed_id)
SELECT id, (SELECT id FROM beds WHERE name = 'Queen Bed')
FROM room_types
WHERE name LIKE 'Superior Room%';

INSERT INTO room_beds (room_type_id, bed_id)
SELECT id, (SELECT id FROM beds WHERE name = 'Double Bed')
FROM room_types
WHERE name LIKE 'Superior Room%';


INSERT INTO room_beds (room_type_id, bed_id)
SELECT id, (SELECT id FROM beds WHERE name = 'Single Bed')
FROM room_types
WHERE name LIKE 'Standard Room%';

INSERT INTO room_beds (room_type_id, bed_id)
SELECT id, (SELECT id FROM beds WHERE name = 'Single Bed')
FROM room_types
WHERE name LIKE 'Standard Room%';

SET SQL_SAFE_UPDATES = 0;


UPDATE room_types
SET capacity = 4
WHERE name LIKE 'Deluxe Room%';

UPDATE room_types
SET capacity = 2
WHERE name LIKE 'Superior Room%';

UPDATE room_types
SET capacity = 2
WHERE name LIKE 'Standard Room%';

SET SQL_SAFE_UPDATES = 1;

INSERT INTO rooms (hotel_id, room_type, price, is_occupied) VALUES
(1, (SELECT id FROM room_types WHERE name = 'Deluxe Room - Bed and Breakfast'), 150.00, FALSE),
(1, (SELECT id FROM room_types WHERE name = 'Deluxe Room - Bed and Breakfast'), 150.00, TRUE),
(1, (SELECT id FROM room_types WHERE name = 'Deluxe Room - Half Board'), 200.00, FALSE),
(1, (SELECT id FROM room_types WHERE name = 'Deluxe Room - Full Board'), 250.00, FALSE),
(1, (SELECT id FROM room_types WHERE name = 'Deluxe Room - All Inclusive'), 300.00, FALSE),
(1, (SELECT id FROM room_types WHERE name = 'Deluxe Room - Room Only'), 100.00, TRUE);

INSERT INTO rooms (hotel_id, room_type, price, is_occupied) VALUES
(1, (SELECT id FROM room_types WHERE name = 'Superior Room - Bed and Breakfast'), 120.00, FALSE),
(1, (SELECT id FROM room_types WHERE name = 'Superior Room - Half Board'), 160.00, FALSE),
(1, (SELECT id FROM room_types WHERE name = 'Superior Room - Full Board'), 200.00, TRUE),
(1, (SELECT id FROM room_types WHERE name = 'Superior Room - All Inclusive'), 240.00, FALSE),
(1, (SELECT id FROM room_types WHERE name = 'Superior Room - Room Only'), 90.00, TRUE);

INSERT INTO rooms (hotel_id, room_type, price, is_occupied) VALUES
(1, (SELECT id FROM room_types WHERE name = 'Standard Room - Bed and Breakfast'), 90.00, FALSE),
(1, (SELECT id FROM room_types WHERE name = 'Standard Room - Half Board'), 130.00, FALSE),
(1, (SELECT id FROM room_types WHERE name = 'Standard Room - Full Board'), 170.00, TRUE),
(1, (SELECT id FROM room_types WHERE name = 'Standard Room - All Inclusive'), 210.00, FALSE),
(1, (SELECT id FROM room_types WHERE name = 'Standard Room - Room Only'), 70.00, TRUE);

INSERT INTO hotel_amenities_usage (hotel_id, amenity_id) VALUES
(1, (SELECT id FROM hotel_amenities WHERE name = 'Swimming Pool')),
(1, (SELECT id FROM hotel_amenities WHERE name = 'Gym')),
(1, (SELECT id FROM hotel_amenities WHERE name = 'Spa'));

INSERT INTO room_amenities_usage (room_type_id, amenity_id)
SELECT id, (SELECT id FROM room_amenities WHERE name = 'Wi-Fi')
FROM room_types
WHERE name LIKE 'Deluxe Room%';

INSERT INTO room_amenities_usage (room_type_id, amenity_id)
SELECT id, (SELECT id FROM room_amenities WHERE name = 'Air Conditioning')
FROM room_types
WHERE name LIKE 'Deluxe Room%';

INSERT INTO room_amenities_usage (room_type_id, amenity_id)
SELECT id, (SELECT id FROM room_amenities WHERE name = 'Mini Bar')
FROM room_types
WHERE name LIKE 'Deluxe Room%';

INSERT INTO room_amenities_usage (room_type_id, amenity_id)
SELECT id, (SELECT id FROM room_amenities WHERE name = 'Safe')
FROM room_types
WHERE name LIKE 'Deluxe Room%';

INSERT INTO room_amenities_usage (room_type_id, amenity_id)
SELECT id, (SELECT id FROM room_amenities WHERE name = 'Television')
FROM room_types
WHERE name LIKE 'Deluxe Room%';

INSERT INTO room_amenities_usage (room_type_id, amenity_id)
SELECT id, (SELECT id FROM room_amenities WHERE name = 'Wi-Fi')
FROM room_types
WHERE name LIKE 'Superior Room%';

INSERT INTO room_amenities_usage (room_type_id, amenity_id)
SELECT id, (SELECT id FROM room_amenities WHERE name = 'Air Conditioning')
FROM room_types
WHERE name LIKE 'Superior Room%';

INSERT INTO room_amenities_usage (room_type_id, amenity_id)
SELECT id, (SELECT id FROM room_amenities WHERE name = 'Mini Bar')
FROM room_types
WHERE name LIKE 'Superior Room%';

INSERT INTO room_amenities_usage (room_type_id, amenity_id)
SELECT id, (SELECT id FROM room_amenities WHERE name = 'Safe')
FROM room_types
WHERE name LIKE 'Superior Room%';

-- Insert amenities usage for Standard Room types
INSERT INTO room_amenities_usage (room_type_id, amenity_id)
SELECT id, (SELECT id FROM room_amenities WHERE name = 'Wi-Fi')
FROM room_types
WHERE name LIKE 'Standard Room%';

INSERT INTO room_amenities_usage (room_type_id, amenity_id)
SELECT id, (SELECT id FROM room_amenities WHERE name = 'Air Conditioning')
FROM room_types
WHERE name LIKE 'Standard Room%';




--before inserting reviews create 4 personal users!!!!!!!
--create one business user before inserting its id! 



-- CREATE TABLE IF NOT EXISTS images (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   hotel_id INT NOT NULL,
--   image_url VARCHAR(255) NOT NULL,
--   FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
-- );


