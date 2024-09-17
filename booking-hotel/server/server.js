const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const { userRouter, hotelRouter } = require("./routes/index.js");
const createDatabase = require("./db/db.js");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", userRouter);
app.use("/hotels", hotelRouter);

const startServer = async () => {
  try {
    await createDatabase();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Error starting server:", err.stack);
  }
};

startServer();
