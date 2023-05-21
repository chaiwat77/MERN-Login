import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductTableInCart from "../card/ProductTableInCart";

//function
import { userCart } from "../functions/users";

const Cart = () => {
  const distpatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  //   ถ้ามี { } ต้องมี return ข้อมูลถึงจะออกนอก function ได้
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
      //   return console.log(currentValue + nextValue.count * nextValue.price);
    }, 0);
  };

  const handleSaveOrder = () => {
    alert("Checkout Order");
    userCart(user.token, cart)
      .then((res) => {
        navigate("/checkout");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showCartItem = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <td>Image</td>
          <td>Title</td>
          <td>Price</td>
          <td>Count</td>
          <td>Remove</td>
        </tr>
      </thead>
      {cart.map((item) => (
        <ProductTableInCart key={item._id} item={item} />
      ))}
    </table>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <h2>Quantity in Cart {cart.length}</h2>
          {!cart.length ? <p>No Product in Cart</p> : showCartItem()}
        </div>
        <div className="col-md-4">
          <h3>Summary</h3>

          <hr />
          {cart.map((item, index) => (
            <p key={index}>
              {item.title} x {item.counnt} = {item.price * item.count}
            </p>
          ))}
          <hr />
          <h3>Total</h3>
          {getTotal()}
          <hr />
          {user ? (
            <button
              className="btn btn-info"
              disabled={!cart.length}
              onClick={handleSaveOrder}
            >
              Check Out
            </button>
          ) : (
            <Link to="/login" state="cart">
              <button className="btn btn-danger">Please Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
