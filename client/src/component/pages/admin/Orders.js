import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { Tabs, Table } from "antd";
import { toast } from "react-toastify";
//function
import { getOrder } from "../../functions/users";
import { updateStatusOrder, getOrderAdmin } from "../../functions/admin";

const { TabPane } = Tabs;

const Orders = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrderAdmin(user.token).then((res) => {
      setOrders(res.data);
    });
  };
  console.log(orders);

  const handleChangeStatus = (orderId, orderstatus) => {
    updateStatusOrder(user.token, orderId, orderstatus).then((res) => {
      console.log(res.data);
      toast.success("Update  " + res.data.orderstatus);
      loadData();
    });
    // console.log(orderId, orderstatus);
  };

  const orderCard = orders.map((item, index) => {
    // console.log(item);
    {
      /* การ loop ซ้อน loop */
    }
    {
      /* 1 loop order card */
    }
    return (
      <div className="card m-3" key={index}>
        <p>
          Order by {item.orderdBy.username}
          <br />
          Order Status {"    " + item.orderstatus}
        </p>

        <select
          value={item.orderstatus}
          onChange={(e) => handleChangeStatus(item._id, e.target.value)}
          className="form form-control"
          style={{ width: "200px", alignSelf: "center" }}
        >
          <option value="Not Process">Not Process</option>
          <option value="Processing">Processing</option>
          <option value="Cancel">Cancel</option>
          <option value="Complete">Complete</option>
        </select>
        <table className="table table-bordered">
          <thead>
            <tr>
              <td>Title</td>
              <td>Price</td>
              <td>Count</td>
            </tr>
          </thead>
          {/* 2 Loop Table */}
          {item.products.map((p, i) => (
            <tr>
              <td>{p.product.title}</td>
              <td>{p.price}</td>
              <td>{p.count}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}>Summary: {item.cartTotal}</td>
          </tr>
        </table>
      </div>
    );
  });

  const columns = [
    {
      title: "User",
      dataIndex: "orderdBy",
      render: (item, i) => <>{item.username}</>,
      // render: (item, i) => <>{console.log(item.username)}</>,
    },
    {
      title: "Product List",
      // dataIndex: "_id",
      // ข้อมูลมาจาก orders ใน state
      //exam loop ซ้อน loop
      render: (item, i) => (
        <>
          <ol>
            {item.products.map((products, i) => (
              <li>
                {products.product.title} {"  "} {products.price} x{" "}
                {products.count}
              </li>
            ))}
          </ol>
        </>
      ),
    },
    {
      title: "Total",
      dataIndex: "cartTotal",
      key: "cartTotal",
    },
    {
      title: "Status Order",
      dataIndex: "orderstatus",
      key: "orderstatus",
    },
    {
      title: "Status Update",
      render: (item) => (
        <>
          <select
            value={item.orderstatus}
            onChange={(e) => handleChangeStatus(item._id, e.target.value)}
            className="form form-control"
            style={{ width: "200px", alignSelf: "center" }}
          >
            <option value="Not Process">Not Process</option>
            <option value="Processing">Processing</option>
            <option value="Cancel">Cancel</option>
            <option value="Complete">Complete</option>
          </select>
        </>
      ),
    },
  ];

  const boostapTable = (
    <table class="table table-striped">
      <thead class="table-danger">
        <tr>
          <th scope="col">User</th>
          <th scope="col">Product List</th>
          <th scope="col">Total</th>
          <th scope="col">Status</th>
          <th scope="col">Status Update</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((item, i) => (
          <tr>
            <th scope="row">{item.orderdBy.username}</th>
            <td>
              <ol>
                {item.products.map((p, i) => (
                  <li>
                    {p.product.title} {"  "}
                    <b>
                      {p.price} x {p.count}
                    </b>
                  </li>
                ))}
              </ol>
            </td>
            <td>{item.cartTotal}</td>
            <td>{item.orderstatus}</td>
            <td>
              <select
                value={item.orderstatus}
                onChange={(e) => handleChangeStatus(item._id, e.target.value)}
                className="form form-control"
                style={{ width: "200px", alignSelf: "center" }}
              >
                <option value="Not Process">Not Process</option>
                <option value="Processing">Processing</option>
                <option value="Cancel">Cancel</option>
                <option value="Complete">Complete</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <MenubarAdmin />
        </div>

        <div class="col text-center">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Order Tab" key="1">
              {orderCard}
            </TabPane>
            <TabPane tab="Table Antd" key="2">
              Table Antd
              <Table columns={columns} dataSource={orders} />
            </TabPane>
            <TabPane tab="Table Boostrap" key="3">
              Table Boostrap
              {boostapTable}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Orders;
