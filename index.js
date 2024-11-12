const express = require("express");
require('dotenv').config()
const cors = require("cors");
const app = express();
const path = require("path");
const { SuccessResponse } = require("./src/handlers/API_response");
const port = 5000;

app.use(cors({origin: '*'}));
// ------------------------------db connection----------------------------
require("./src/config/db.config");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));



// ------------------------------Routes----------------------------------
app.use("/", require("./src/routes/routes"));

app.get('/', (req, res, next) => {
    res.status(200).send(SuccessResponse(200,'server is running',));
});


// ------------------------------Error----------------------------
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  console.error(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).send({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});




// ------------------------------404 Not Found----------------------------------
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});



// ------------------------------Server----------------------------
app.listen(port, () => {
  console.log(`Success :-  Server running at http://localhost:${port}/`);
});
