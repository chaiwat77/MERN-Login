import React, { useState } from "react";
import { toast } from "react-toastify";
import { Spin } from "antd";
//function
import { login } from "../../functions/auth";

// redux
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.state);
  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const roleBaseRedirect = (role) => {
    let intended = location.state;
    // console.log(role);
    if (intended) {
      navigate("../" + intended);
    } else {
      if (role === "admin") {
        navigate("/admin/index");
      } else {
        navigate("/user/index");
      }
    }
  };

  const handdleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handdleSubmit = (e) => {
    // กดส่งไปเปลี่ยนเป็น true
    setLoading(true);
    e.preventDefault();
    console.log(value);
    login(value)
      .then((res) => {
        //ได้รับ response จาก sv แล้ว
        setLoading(false);
        console.log(res.data);
        toast.info(res.data.payload.user.username + " Login Success");

        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          },
        });

        localStorage.setItem("token", res.data.token);
        roleBaseRedirect(res.data.payload.user.role);
      })
      .catch((err) => {
        // setLoading(false)
        console.log(err.response.data);
        toast.error(err.response.data);
      });
  };

  return (
    <div className="container p-5">
      {/* <h1>Login Page</h1> */}
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h1>
              Loading... <Spin size="large" delay={500} />
            </h1>
          ) : (
            <h1>Login page</h1>
          )}
          <form onSubmit={handdleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                onChange={handdleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                name="password"
                onChange={handdleChange}
                className="form-control"
              />
            </div>

            <div style={{ padding: "10px" }}>
              <button className="btn btn-success">submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
