const express = require("express");
const router = express.Router();

//controllers
const { create, list } = require("../controllers/product");
//midleware
const { auth, adminCheck } = require("../middleware/auth");
//Endpoint http://127.0.0.1:5000/api/product/
router.post("/product", auth, adminCheck, create);
router.get("/product/:count", list);

module.exports = router;
