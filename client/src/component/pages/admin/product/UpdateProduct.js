import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenubarAdmin from "../../../layouts/MenubarAdmin";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileUpload from "./FileUpload";
//function
import { readProduct, updateProduct } from "../../../functions/product";

import { listCategory } from "../../../functions/category";

const initialstate = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};

const UpdateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState(initialstate);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readProduct(params.id)
      .then((res) => {
        //code
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    listCategory(user.token)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("product", values);
  //   console.log("Cate", category);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    updateProduct(user.token, values._id, values)
      .then((res) => {
        setLoading(false);
        toast.success("Update Complete!");
        console.log(res);
        navigate("/admin/index");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error Update Product !!");
      });
  };

  return (
    <div class="container-fluid">
      <div clsas="row">
        <div class="col-md-2">
          <MenubarAdmin />
        </div>

        <div class="col">
          {loading ? <h1>Loading....</h1> : <h1>Update Product</h1>}

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
                value={values.category._id}
              >
                <option>Please Select Category</option>
                {category.length > 0 &&
                  category.map((item) => (
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

export default UpdateProduct;
