const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//model
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.listUsers = async (req, res) => {
  try {
    const user = await User.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Sever Error!!");
  }
};

exports.readUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Sever Error!!");
  }
};

exports.updateUsers = async (req, res) => {
  try {
    //วิธีที่ 1 basic
    // let newPassword = (req.body.values.password);
    //วิธีที่ 2
    let { id, password } = req.body.values;
    // 1 gen salt
    const salt = await bcrypt.genSalt(10);
    //2 encrypt pass
    //วิธีที่ 1.1
    // let enPassword = await bcrypt.hash(newPassword,salt);
    //วิธีที่ 2.1
    let enPassword = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { _id: id },
      { password: enPassword }
    );
    res.send(user);
    // res.send('Update user')
  } catch (err) {
    console.log(err);
    res.status(500).send("Sever Error!!");
  }
};
exports.removeUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Sever Error!!");
  }
};
exports.changeStatus = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { enabled: req.body.enabled }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Sever Error!!");
  }
};

exports.changeRole = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Sever Error!!");
  }
};

exports.userCart = async (req, res) => {
  try {
    // รับข้อมูลจากหน้าบ้าน
    const { cart } = req.body;
    // check User
    let user = await User.findOne({ username: req.user.username }).exec();

    // สร้าง Array[{1},{2},{3}]
    let products = [];
    //ตรวจสอบ ตะกร้าสินค้า เก่า
    let cartOld = await Cart.findOne({ orderdBy: user._id }).exec();
    if (cartOld) {
      // cartOld.remove();
      cartOld.deleteOne();
      console.log("remove old cart");
    }
    // cแต่งข้อมูลสินค้า
    for (let i = 0; i < cart.length; i++) {
      let object = {};

      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;
      //{3}
      products.push(object);
    }
    // ผลรวม cart
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderdBy: user._id,
    }).save();

    console.log(newCart);
    res.send("userCart Ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("User Cart  Error");
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let cart = await Cart.findOne({ orderdBy: user._id })
      .populate("products.product", "_id title price")
      .exec();

    const { products, cartTotal } = cart;
    res.json({ products, cartTotal });
  } catch (err) {
    res.status(500).send("Get user cart Error!!");
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const userAddress = await User.findOneAndUpdate(
      { username: req.user.username },
      { address: req.body.address }
    ).exec();

    res.json({ ok: true });
  } catch (err) {
    res.status(500).send("Save Address Error!!");
  }
};

exports.saveOrder = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.user.username }).exec();
    let userCart = await Cart.findOne({ orderdBy: user._id }).exec();

    let order = await new Order({
      products: userCart.products,
      orderdBy: user._id,
      cartTotal: userCart.cartTotal,
    }).save();

    // update product in stock
    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });

    let updated = await Product.bulkWrite(bulkOption);

    // res.send(userCart);
    res.send(updated);
  } catch (err) {
    res.status(500).send("Save Order Error!!");
  }
};

exports.getOrder = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let order = await Order.find({ orderdBy: user._id })
      .populate("products.product")
      .exec();

    res.json(order);
  } catch (err) {
    res.status(500).send("Get order cart Error!!");
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    const empty = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();

    res.send(empty);
  } catch (err) {
    res.status(500).send("Remove Cart Error!!");
  }
};

exports.addToWishList = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findOneAndUpdate(
      { username: req.user.username },
      { $addToSet: { wishlist: productId } }
    ).exec();
    res.send(user);
    // res.send(user)
  } catch (err) {
    res.status(500).send("Add Wishlist Error!!");
  }
};
exports.getToWishList = async (req, res) => {
  try {
    let list = await User.findOne({ username: req.user.username })
      .select("wishlist")
      .populate("wishlist")
      .exec();
    res.json(list);
  } catch (err) {
    res.status(500).send("Get Wishlist Error!!");
  }
};

exports.removeToWishList = async (req, res) => {
  try {
    const { productId } = req.params;
    let user = await User.findOneAndUpdate(
      { username: req.user.username },
      { $pull: { wishlist: productId } }
    ).exec();

    res.send(user);
  } catch (err) {
    res.status(500).send("Remove Wishlist Error!!");
  }
};
