const Category = require("../models/Category");

exports.list = async (req, res) => {
  try {
    const category = await Category.find({}).exec();
    res.send(category);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const { name } = req.body;
    const category = await new Category({ name }).save();
    res.send("Create Success");
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOne({ _id: id });
    console.log(id);
    res.send(category);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const category = await Category.findOneAndUpdate({ _id: id }, { name });
    res.send(category);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndDelete({ _id: id });
    res.send("Remove Success");
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
