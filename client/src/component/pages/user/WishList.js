import React, { useState, useEffect } from "react";
import MenubarUser from "../../layouts/MenubarUser";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, ListGroup } from "react-bootstrap";
import { Heart } from "react-bootstrap-icons";

import { getWishList, removeToWishList } from "../../functions/users";
import { Link } from "react-router-dom";

const WishList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const [wishlist, setWishList] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getWishList(user.token).then((res) => {
      setWishList(res.data.wishlist);
    });
  };

  const handleRemove = (productId) => {
    removeToWishList(user.token, productId).then((res) => {
      console.log(res.data);
      loadData();
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <MenubarUser />
          </div>

          <div className="col">
            <div className="row">
              <h2>Wishlist Page</h2>
              <ListGroup>
                {wishlist.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <Link to={"/product/" + item._id}>{item.title}</Link>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(item._id)}
                    >
                      <Heart />
                      Remove List
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
        </div>
      </div>
      {/* <div class="container-fluid">
        <div class="row">
          <div class="col-md-2">
            <MenubarUser />
          </div>

          <div class="col">
            <div className="row">
              <h2>Wishlist Page</h2>
              {wishlist.map((item, index) => (
                <div key={index} className="alert alert-secondary">
                  <Link to={"/product/" + item._id}>{item.title}</Link>
                  <Button
                    variant="danger"
                    onClick={() => handleRemove(item._id)}
                    style={{ float: "right" }}
                  >
                    <Heart />
                    Remove List
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default WishList;
