import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
//function
import {
  getUserCart,
  saveAddress,
  saveOrder,
  emptyCart,
} from "../functions/users";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log(res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const handleSaveAddress = () => {
    saveAddress(user.token, address).then((res) => {
      console.log(res.data);
      if (res.data.ok) {
        toast.success("Address Save");
        setAddressSaved(true);
      }
    });
  };

  const handleCreateOrder = () => {
    saveOrder(user.token).then((res) => {
      console.log(res.data);
      // clear db ด้วย fuction emptyCart
      emptyCart(user.token);
      //clear store
      dispacth({
        type: "ADD_TO_CART",
        payload: [],
      });

      //clear localstorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }

      toast.success("Save Order Complete");
      navigate("/user/history");
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h2>Address</h2>
          <br />
          text area
          <ReactQuill value={address} onChange={setAddress} />
          <button className="btn btn-primary m-1" onClick={handleSaveAddress}>
            Save Address
          </button>
        </div>
        <div className="col-md-6">
          <h2>Order Summary</h2>
          <br />
          <p>Product {products.length}</p>
          <hr />
          <p>List Product</p>
          {products.map((item, i) => (
            <div key={i}>
              <p>
                {item.product.title} x {item.count} = {item.price * item.count}
              </p>
            </div>
          ))}
          <hr />
          Total: {total}
          <br />
          <button
            className="btn btn-primary mt-3"
            disabled={!addressSaved || !products.length}
            onClick={handleCreateOrder}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
