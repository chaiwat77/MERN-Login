import { Menu, Badge } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  DashboardTwoTone,
} from "@ant-design/icons";

//redux
import { useDispatch, useSelector } from "react-redux";
import Search from "../card/Search";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));
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

      <div style={{ flex: 1 }}></div>

      <Menu.Item key="shop" icon={<ShopOutlined />}>
        <Link to="/shop">Shop</Link>
      </Menu.Item>
      <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={(9, 0)}>
            Cart
          </Badge>
        </Link>
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
            <Menu.Item icon={<DashboardTwoTone />} key="setting:5">
              <Link to="/user/index">Dashboard</Link>
            </Menu.Item>
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
