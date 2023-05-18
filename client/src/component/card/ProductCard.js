import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";

const { Meta } = Card;
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => ({ ...state }));

  // console.log(product);
  const { _id, title, description, images } = product;

  // console.log(_id);

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
    <div>
      <Card
        hoverable
        cover={
          <img
            className="p-1"
            style={{ height: "150px", objectFit: "cover" }}
            alt="example"
            src={images && images.length ? images[0].url : ""}
          />
        }
        actions={[
          <Link to={"/product/" + _id}>
            <EyeOutlined className="text-warning" />
          </Link>,

          <ShoppingCartOutlined
            className="text-danger"
            onClick={handleAddToCart}
          />,
        ]}
      >
        <Meta title={title} description={description} />
      </Card>
    </div>
  );
};

export default ProductCard;
