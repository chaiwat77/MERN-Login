import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";

//function
import { readCategory, editCategory } from "../../../functions/category";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const param = useParams();

  const [name, setName] = useState("");

  useEffect(() => {
    loadData(user.token, param.id);
  }, []);

  const loadData = (authtoken, id) => {
    readCategory(authtoken, id)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   console.log(name);
  //   console.log(param.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    editCategory(user.token, param.id, { name })
      .then((res) => {
        navigate("/admin/create-category");
        toast.success("Update " + res.data.name + " Success!");
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(name);
  };

  return (
    <div class="container-fluid">
      <div clsas="row">
        <div class="col-md-2">
          <MenubarAdmin />
        </div>

        <div class="col">
          <h1>Update Page </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>update</label>
              <input
                className="form-control"
                value={name}
                autoFocus
                required
                // เหมาะสำหรับ มี input น้อย
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button className="btn btn-primary">submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
