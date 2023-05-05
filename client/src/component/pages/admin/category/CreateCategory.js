import React, { useEffect, useState } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";

//funcition by folder function
import {
  createCategory,
  listCategory,
  deleteCategory,
} from "../../../functions/category";

import { Link } from "react-router-dom";

const CreateCategory = () => {
  const [values, setValues] = useState({
    name: "",
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listCategory()
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("data", category);

  const handleChangeCategory = (e) => {
    console.log(values.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(values)
      .then((res) => {
        console.log(res);
        //เมื่อมีการ submit จะเรียกใช้ loaddata เพื่อ refresh ข้อมูล
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (id) => {
    deleteCategory(id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="container-fluid">
      <div clsas="row">
        <div class="col-md-2">
          <MenubarAdmin />
        </div>

        <div class="col">
          <h1>Create Category</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>เพิ่มหมวดหมู่</label>
              <input
                type="text"
                name="name"
                value={values.name}
                className="form-control"
                onChange={handleChangeCategory}
              />
              <button className="btn btn-outline-success">Submit</button>
            </div>
          </form>
          <hr />
          <ul className="list-group">
            {category.map((item) => (
              <li className="list-group-item">
                {item.name}
                <span
                  style={{ float: "right" }}
                  className="badge bg-primary rounded-pill"
                  onClick={() => handleDelete(item._id)}
                >
                  X
                </span>
                <span
                  style={{ float: "right" }}
                  className="badge bg-primary rounded-pill"
                >
                  <Link to={`/admin/update-category/${item._id}`}>Edit</Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
