import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="register">
        <Link to="/register">Register</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;