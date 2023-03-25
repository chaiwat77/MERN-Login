import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

//redux
import { useDispatch } from 'react-redux';



const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () =>{
      dispatch({
        type: 'LOGOUT',
        payload: null
      });
      navigate('/');
  }

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
      <Menu.Item 
      key="logout" 
      onClick={logout}
      >
        logout
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;