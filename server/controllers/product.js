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
    // console.log(count);
    // populate คือการ join ข้อมูล
    const product = await Product.find()
      .limit(count)
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
    })
      .populate("category")
      .exec();
    res.send(deleted);
  } catch (err) {
    res.status(500).send("Server Error !!");
  }
};

exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
    }).exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error !!");
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    ).exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error !!");
  }
};

exports.listBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    const product = await Product.find()
      .limit(limit)
      .populate("category")
      .sort([[sort, order]]);
    res.send(product);
  } catch (err) {
    res.status(500).send("ListBy Error !!");
  }
};
