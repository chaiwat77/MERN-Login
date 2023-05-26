import React from "react";
import { Link } from "react-router-dom";

const MenubarAdmin = () => {
  return (
    <nav>
      <ul class="nav flex-column">
        <li class="nav-item">
          <Link to="/admin/index">Dashboard</Link>
        </li>
        <li class="nav-item">
          <Link to="/admin/manage-admin">จัดการ user</Link>
        </li>
        <li class="nav-item">
          <Link to="/admin/create-category">จัดการ Category</Link>
        </li>
        <li class="nav-item">
          <Link to="/admin/create-product">เพิ่ม Product</Link>
        </li>
        <li class="nav-item">
          <Link to="/admin/orders">Order Manage</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenubarAdmin;
