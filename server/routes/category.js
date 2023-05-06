const express = require("express");
const router = express.Router();

//controllers
const {
  list,
  create,
  read,
  update,
  remove,
} = require("../controllers/category");

//midleware
const { auth, adminCheck } = require("../middleware/auth");
//Endpoint http://127.0.0.1:5000/api/category/
router.get("/category", auth, adminCheck, list);
router.post("/category", auth, adminCheck, create);
router.get("/category/:id", auth, adminCheck, read);
router.put("/category/:id", auth, adminCheck, update);
router.delete("/category/:id", auth, adminCheck, remove);

module.exports = router;
