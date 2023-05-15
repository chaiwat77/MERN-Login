import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

//redux
import { useDispatch, useSelector } from "react-redux";
import Search from "../card/Search";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  // console.log(user);
  const { SubMenu } = Menu;

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };

  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="shop" icon={<ShoppingCartOutlined />}>
        <Link to="/shop">Shop</Link>
      </Menu.Item>

      {/* ถ้าไม่มี user จะแสดง register  */}
      {!user && (
        <>
          <Menu.Item key="login" icon={<UserAddOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>

          <Menu.Item key="register" icon={<LoginOutlined />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}

      {/* ถ้ามี user login อยู่ จะแสดง logout  */}
      {user && (
        <>
          <SubMenu
            key="SubMenu"
            icon={<CaretDownOutlined />}
            title={user.username}
          >
            <Menu.Item
              icon={<LogoutOutlined />}
              key="setting:1"
              onClick={logout}
            >
              Logout
            </Menu.Item>
          </SubMenu>
        </>
      )}
      <span style={{ float: "right" }} className="p-1">
        <Search />
      </span>
    </Menu>
  );
};

export default Navbar;
