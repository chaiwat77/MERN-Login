import React, { useState, useEffect } from "react";
import MenubarUser from "../../layouts/MenubarUser";
import { useSelector } from "react-redux";
import { getOrder } from "../../functions/users";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrder(user.token).then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  };
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <MenubarUser />
        </div>

        <div class="col">
          <div className="row">
            <h2>History</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
