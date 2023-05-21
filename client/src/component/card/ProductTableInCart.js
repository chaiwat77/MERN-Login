import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";

const ProductTableInCart = ({ item }) => {
  console.log("producttable", item);
  const dispatch = useDispatch();

  const handleChangeCount = (e) => {
    const count = e.target.value < 1 ? 1 : e.target.value;

    if (count > item.quantity) {
      toast.error("จำนวนสินค้ามีเพียง " + item.quantity + " ชิ้น");
      return;
    }
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    // console.log(cart);
    cart.map((product, i) => {
      if (product._id == item._id) {
        cart[i].count = count;
      }
    });

    // setItem ต้องแปลงเป็น JSON.stringify
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  const handleRemove = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    // console.log(cart);
    cart.map((product, i) => {
      if (product._id == item._id) {
        cart.splice(i, 1);
      }
    });

    // setItem ต้องแปลงเป็น JSON.stringify
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };
  return (
    <>
      <tbody>
        <tr>
          <td>
            {item.images.length !== 0 ? (
              <img src={item.images[0].url} width="100" />
            ) : (
              <img
                src="https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="
                width="100"
              />
            )}
            {/* ถ้าต้องการแสดงมากกว่า 1ภาพ  */}
            {/* {item.images.length !== 0 &&
              item.images.map((_, index) => (
                <img src={item.images[index].url} width="100" />
              ))} */}
          </td>
          <td>{item.title}</td>
          <td>{item.price}</td>
          <td>
            <input
              className="form-control"
              type="number"
              value={item.count}
              onChange={handleChangeCount}
            />
          </td>
          <td>
            <DeleteOutlined className="text-danger" onClick={handleRemove} />
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default ProductTableInCart;
