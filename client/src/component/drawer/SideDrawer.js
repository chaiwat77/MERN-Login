import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Drawer } from "antd";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));

  const onCloseDrawer = () => {
    dispatch({
      type: "SET_VISIBLE",
      payload: false,
    });
  };
  return (
    <Drawer
      title={"Item in Cart " + cart.length + " product"}
      placement="right"
      visible={drawer}
      onClose={onCloseDrawer}
    >
      {cart.map((item, index) => (
        <div className="row">
          <div className="col">
            {item.images.length !== 0 ? (
              <img src={item.images[0].url} width="100" />
            ) : (
              <img
                src="https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="
                width="200"
              />
            )}
            <p className="text-center">
              {item.title} x {item.count}
            </p>
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button className="btn btn-success" onClick={onCloseDrawer}>
          Go to Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
