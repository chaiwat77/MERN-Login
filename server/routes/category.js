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
router.get("/category", list);
router.post("/category", create);
router.get("/category/:id", read);
router.put("/category/:id", update);
router.delete("/category/:id", remove);

module.exports = router;
