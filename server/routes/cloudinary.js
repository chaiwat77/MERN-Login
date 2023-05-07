const express = require("express");
const router = express.Router();

//controllers
const { createImage, removeImage } = require("../controllers/cloudinary");

//midleware
const { auth, adminCheck } = require("../middleware/auth");
//Endpoint http://127.0.0.1:5000/api/images/
router.post("/images", auth, adminCheck, createImage);
router.post("/removeimages", auth, adminCheck, removeImage);

module.exports = router;
