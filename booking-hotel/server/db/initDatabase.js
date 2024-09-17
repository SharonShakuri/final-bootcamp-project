// const { promisePool } = require("./dbPool");

// const initializeDatabase = async () => {
//   try {
//     await promisePool.query("CREATE DATABASE IF NOT EXISTS booking_clone");
//     console.log("Database 'booking_clone' created or already exists.");

//     console.log("Switching to 'booking_clone' database...");
//     await promisePool.query("USE booking_clone");

//     const createTables = [
//       `CREATE TABLE IF NOT EXISTS roles (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) UNIQUE NOT NULL
//       )`,
//       `CREATE TABLE IF NOT EXISTS users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         role_id INT,
//         first_name VARCHAR(255) NOT NULL,
//         last_name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         phone VARCHAR(20),
//         password VARCHAR(255) NOT NULL,
//         refresh_token VARCHAR(255),
//         reset_token VARCHAR(255),
//         reset_token_expires_at DATETIME,
//         access_token VARCHAR(255),
//         FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
//       )`,
//       `CREATE TABLE IF NOT EXISTS pension (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) UNIQUE NOT NULL
//       )`,
//       `CREATE TABLE IF NOT EXISTS beds (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) UNIQUE NOT NULL,
//         capacity INT NOT NULL
//       )`,
//       `CREATE TABLE IF NOT EXISTS hotel_amenities (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) UNIQUE NOT NULL
//       )`,
//       `CREATE TABLE IF NOT EXISTS room_amenities (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) UNIQUE NOT NULL
//       )`,
//       `CREATE TABLE IF NOT EXISTS hotels (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         user_id INT,
//         name VARCHAR(255) NOT NULL,
//         rating FLOAT CHECK (rating BETWEEN 0 AND 10),
//         city_center FLOAT NOT NULL,
//         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
//       )`,
//       `CREATE TABLE IF NOT EXISTS room_types (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         pension_type INT,
//         capacity INT NOT NULL,
//         FOREIGN KEY (pension_type) REFERENCES pension(id) ON DELETE SET NULL
//       )`,
//       `CREATE TABLE IF NOT EXISTS rooms (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         hotel_id INT NOT NULL,
//         room_type INT,
//         price DECIMAL(10, 2) NOT NULL,
//         is_occupdied BOOLEAN NOT NULL DEFAULT FALSE,
//         FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
//         FOREIGN KEY (room_type) REFERENCES room_types(id) ON DELETE SET NULL
//       )`,
//       `CREATE TABLE IF NOT EXISTS room_amenities_usage (
//         room_type_id INT NOT NULL,
//         amenity_id INT NOT NULL,
//         PRIMARY KEY (room_type_id, amenity_id),
//         FOREIGN KEY (room_type_id) REFERENCES room_types(id) ON DELETE CASCADE,
//         FOREIGN KEY (amenity_id) REFERENCES room_amenities(id) ON DELETE CASCADE
//       )`,
//       `CREATE TABLE IF NOT EXISTS hotel_amenities_usage (
//         hotel_id INT NOT NULL,
//         amenity_id INT NOT NULL,
//         PRIMARY KEY (hotel_id, amenity_id),
//         FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
//         FOREIGN KEY (amenity_id) REFERENCES hotel_amenities(id) ON DELETE CASCADE
//       )`,
//       `CREATE TABLE IF NOT EXISTS room_beds (
//         room_type_id INT NOT NULL,
//         bed_id INT NOT NULL,
//         PRIMARY KEY (room_type_id, bed_id),
//         FOREIGN KEY (room_type_id) REFERENCES room_types(id) ON DELETE CASCADE,
//         FOREIGN KEY (bed_id) REFERENCES beds(id) ON DELETE CASCADE
//       )`,
//       `CREATE TABLE IF NOT EXISTS images (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         hotel_id INT NOT NULL,
//         image_url VARCHAR(255) NOT NULL,
//         FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
//       )`,
//       `CREATE TABLE IF NOT EXISTS reviews (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         user_id INT,
//         hotel_id INT NOT NULL,
//         title VARCHAR(255) NOT NULL,
//         description TEXT,
//         overall_rating FLOAT CHECK (overall_rating BETWEEN 0 AND 10),
//         date_posted DATE NOT NULL,
//         staff_rating FLOAT CHECK (staff_rating BETWEEN 0 AND 10),
//         amenities_rating FLOAT CHECK (amenities_rating BETWEEN 0 AND 10),
//         hygiene_rating FLOAT CHECK (hygiene_rating BETWEEN 0 AND 10),
//         guest_comfort_rating FLOAT CHECK (guest_comfort_rating BETWEEN 0 AND 10),
//         value_proposition_rating FLOAT CHECK (value_proposition_rating BETWEEN 0 AND 10),
//         location_rating FLOAT CHECK (location_rating BETWEEN 0 AND 10),
//         free_wifi_rating FLOAT CHECK (free_wifi_rating BETWEEN 0 AND 10),
//         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
//         FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
//       )`,
//       `CREATE TABLE IF NOT EXISTS orders (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         user_id INT,
//         hotel_id INT NOT NULL,
//         order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//         check_in_date DATE NOT NULL,
//         check_out_date DATE NOT NULL,
//         status ENUM('confirmed', 'cancelled', 'pending') NOT NULL DEFAULT 'pending',
//         total_amount DECIMAL(10, 2) NOT NULL,
//         number_of_guests INT NOT NULL,
//         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
//         FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
//       )`,
//       `CREATE TABLE IF NOT EXISTS order_details (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         order_id INT NOT NULL,
//         room_type_id INT,
//         number_of_rooms INT NOT NULL,
//         price_per_room DECIMAL(10, 2) NOT NULL,
//         number_of_guests INT NOT NULL,
//         FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
//         FOREIGN KEY (room_type_id) REFERENCES room_types(id) ON DELETE SET NULL
//       )`,
//     ];

//     for (const query of createTables) {
//       console.log(`Executing query: ${query}`);
//       await promisePool.query(query);
//     }
//     console.log("Created tables");

//     const insertRoles = `
//       INSERT INTO roles (name) VALUES
//       ('Personal'),
//       ('Business')
//       ON DUPLICATE KEY UPDATE name=VALUES(name);
//     `;
//     console.log(`Executing query: ${insertRoles}`);
//     await promisePool.query(insertRoles);
//     console.log("Inserted initial roles");
//   } catch (err) {
//     console.error("Error initializing database:", err.stack);
//   }
// };

// module.exports = initializeDatabase;
