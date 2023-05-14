import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

//function
import { createProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";
import FileUpload from "./FileUpload";

const initialstate = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};

const CreateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [loading, setLoading] = useState(false);
  //   console.log("product page", user);

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        // console.log(res.data);
        // copy ค่าก่อนหน้า มาเก็บไว้ใน categories
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("values", values);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
    createProduct(user.token, values)
      .then((res) => {
        console.log(res);
        toast.success("Add " + res.data.title + " Success!!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error " + err.response.data);
      });
  };

  return (
    <div class="container-fluid">
      <div clsas="row">
        <div class="col-md-2">
          <MenubarAdmin />
        </div>
        <br />
        <div class="col">
          {loading ? (
            <h1>
              Loading..... <Spin size="large" />
            </h1>
          ) : (
            <h1>Create Product Page </h1>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                className="form-control"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </div>

            {/* <div className="form-group">
              <label>Category</label>
              <input
                className="form-control"
                type="text"
                name="category"
                value={values.category}
                onChange={handleChange}
              />
            </div> */}

            <div className="form-group">
              <label>Price</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>QTY</label>
              <input
                className="form-control"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                name="category"
                onChange={handleChange}
              >
                <option>Please Select Category</option>
                {/* values.categories มาจากค่าของ state  */}
                {values.categories.length > 0 &&
                  values.categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <FileUpload
              values={values}
              setValues={setValues}
              loading={loading}
              setLoading={setLoading}
            />
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
