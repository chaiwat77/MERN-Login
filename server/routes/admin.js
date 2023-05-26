const express = require("express");
const router = express.Router();

//middleware
const { auth, adminCheck } = require("../middleware/auth");

const { changOrderStatus, getOrderAdmin } = require("../controllers/admin");

//@Endpoint  http://localhost:5000/api/admin/order-status
//@Method    PUT/GET
//@Access    Private
router.put("/admin/order-status", auth, changOrderStatus);
router.get("/admin/order", auth, getOrderAdmin);

module.exports = router;
