import React from "react";
import { Card, Tabs } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";

const { Meta } = Card;
const { Tabpane } = Tabs;
const SingleProductCard = ({ product }) => {
  const { _id, title, description, images, price, sold, quantity, category } =
    product;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({ ...product, count: 1 });

    let unique = _.uniqWith(cart, _.isEqual);

    //ชื่อที่ส่งไปเก็บคือ cart ตอนเรียกใช้ต้องเรียกใช้ cart
    localStorage.setItem("cart", JSON.stringify(unique));
    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
  };

  return (
    <>
      <div className="col-md-7">
        <Carousel autoPlay showArrows={true} infiniteLoop>
          {images &&
            images.map((item) => <img src={item.url} key={item.public_id} />)}
        </Carousel>
        <Tabs>
          <Tabpane tab="Description" key="1">
            {description}
          </Tabpane>
          <Tabpane tab="More.." key="2">
            More...
          </Tabpane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        <Card
          actions={[
            <Link to={"/"}>
              <HeartOutlined className="text-info" />
              <br />
              Add to list
            </Link>,
            <>
              <ShoppingCartOutlined
                className="text-danger"
                onClick={handleAddToCart}
              />
              Add to Cart
            </>,
          ]}
        >
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Price
              <span className="float-end">{price}</span>
            </li>
            <li className="list-group-item">
              Quantity
              <span className="float-end">{quantity}</span>
            </li>
            <li className="list-group-item">
              Sold
              <span className="float-end">{sold}</span>
            </li>

            {category && (
              <li className="list-group-item">
                Category
                <span className="float-end">{category.name}</span>
              </li>
            )}
          </ul>
        </Card>
      </div>
    </>
  );
};

export default SingleProductCard;
