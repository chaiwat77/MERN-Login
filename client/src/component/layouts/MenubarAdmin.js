import React from "react";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

const MenubarAdmin = () => {
  return (
    <div className="d-flex-fluid">
      <div className="list-group mt-3">
        <nav className="nav flex-column">
          <Link
            to="/admin/index"
            className="nav-link list-group-item list-group-item-action"
          >
            <DashboardOutlined className="me-2" />
            Dashboard
          </Link>
          <Link
            to="/admin/manage-admin"
            className="nav-link list-group-item list-group-item list-group-item-action"
          >
            <UserOutlined className="me-2" />
            จัดการผู้ใช้งาน
          </Link>
          <Link
            to="/admin/create-category"
            className="nav-link list-group-item list-group-item list-group-item-action"
          >
            <AppstoreAddOutlined className="me-2" />
            จัดการหมวดหมู่สินค้า
          </Link>
          <Link
            to="/admin/create-product"
            className="nav-link list-group-item list-group-item list-group-item-action"
          >
            <ShoppingCartOutlined className="me-2" />
            เพิ่มสินค้า
          </Link>
          <Link
            to="/admin/orders"
            className="nav-link list-group-item list-group-item list-group-item-action"
          >
            <HistoryOutlined className="me-2" />
            จัดการออเดอร์
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MenubarAdmin;
