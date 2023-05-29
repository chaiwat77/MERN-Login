import React from "react";
import { Link } from "react-router-dom";
import { HeartOutlined, HistoryOutlined } from "@ant-design/icons";

const MenubarUser = () => {
  return (
    <>
      <div className="d-flex-fluid">
        <div className="list-group mt-3">
          <nav className="nav flex-column">
            <Link
              to="/user/wishlist"
              className="nav-link list-group-item list-group-item-action"
            >
              <HeartOutlined className="me-2" />
              สินค้าที่สนใจ
            </Link>
            <Link
              to="/user/history"
              className="nav-link list-group-item list-group-item list-group-item-action"
            >
              <HistoryOutlined className="me-2" />
              จัดการผู้ใช้งาน
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MenubarUser;
