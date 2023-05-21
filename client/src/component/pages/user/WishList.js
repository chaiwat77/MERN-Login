import React, { useState, useEffect } from "react";
import MenubarUser from "../../layouts/MenubarUser";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getWishList, removeToWishList } from "../../functions/users";
import { Link } from "react-router-dom";

const WishList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const [wishlist, setWishList] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  console.log(wishlist);

  const loadData = () => {
    getWishList(user.token).then((res) => {
      setWishList(res.data.wishlist);
      // console.log(res.data.wishlist);
    });
  };

  const handleRemove = (productId) => {
    removeToWishList(user.token, productId).then((res) => {
      console.log(res.data);
      loadData();
    });
  };
  return (
    <div class="container-fluid">
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
                <span
                  style={{ float: "right" }}
                  onClick={() => handleRemove(item._id)}
                >
                  Remove List
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
