const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");

const userRoutes = require("./routes/users.route");

const path = require("path");
env.config();

mongoose
  .connect(
    // `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.bo5ea.mongodb.net/${process.env.MONGO_DB_DATABASE}`,
    // `mongodb+srv://shubhra08:shubhra08@cluster0.56ii0.mongodb.net/slack_db?retryWrites=true&w=majority`,
    process.env.dburl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => {
    console.log("Database connected");
  });

// app.use("/public", express.static(path.join(__dirname, "uploads")));


app.use(express.json());
app.use("/api", userRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
