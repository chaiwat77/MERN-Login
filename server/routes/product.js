const express = require("express");
const router = express.Router();

//controllers
const { create, list, removeProduct } = require("../controllers/product");
//midleware
const { auth, adminCheck } = require("../middleware/auth");
//Endpoint http://127.0.0.1:5000/api/product/
router.post("/product", auth, adminCheck, create);
router.get("/product/:count", list);
router.delete("/product/:id", auth, adminCheck, removeProduct);

module.exports = router;
