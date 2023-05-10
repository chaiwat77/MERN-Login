const Product = require("../models/Product");

exports.create = async (req, res) => {
  try {
    const product = await new Product(req.body).save();
    res.send(product);
  } catch (err) {
    res.status(500).send("Create Product Error !!");
  }
};
exports.list = async (req, res) => {
  try {
    const count = parseInt(req.params.count);
    console.log(count);
    // populate คือการ join ข้อมูล
    const product = await Product.find()
      .limit(100)
      .populate("category")
      .sort([["createdAt", "desc"]]);
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error !!");
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      _id: req.params.id,
    }).exec();
    res.send(deleted);
  } catch (err) {
    res.status(500).send("Server Error !!");
  }
};
