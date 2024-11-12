const express = require("express");
const { getAllUsers, registerUser, UpdateUser, getSingleUser,LoginUser } = require("../../controllers/v1/user.controller");
const router = express();

router.get("/all", getAllUsers);
router.get("/:id", getSingleUser);
router.post("/login", LoginUser);
router.post("/register", registerUser);
router.put("/update/:id", UpdateUser);

module.exports = router;
