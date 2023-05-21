import React from "react";
import { Link } from "react-router-dom";

const MenubarUser = () => {
  return (
    <nav>
      <ul class="nav flex-column">
        <li class="nav-item">
          <Link to="/user/wishlist">สินค้าที่สนใจ</Link>
        </li>
        <li class="nav-item">
          <Link to="/user/history">ประวัติการสั่งซื้อ</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenubarUser;
