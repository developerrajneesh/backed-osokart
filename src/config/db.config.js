const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    mongoose
      .connect(process.env.manooge_uri)
      .then(() => console.log("Success :-  Connected to the database at "+process.env.manooge_uri))
      .catch((err) => console.log("Error :-  Not connected to the database"));
  } catch (error) {
    console.log("Error :-  Not connected to the database");
  }
};

dbConnection();
