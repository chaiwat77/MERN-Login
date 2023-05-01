import React, { useEffect, useState } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";

//funcition by folder function
import { createCategory } from "../../functions/category";

const CreateCategory = () => {
  const [values, setValues] = useState({
    name: "",
  });
  const handleChangeCategory = (e) => {
    console.log(values.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(values)
      .then((res) => {
        console.log(res);
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
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
