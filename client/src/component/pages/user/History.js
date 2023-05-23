import React, { useState, useEffect } from "react";
import MenubarUser from "../../layouts/MenubarUser";
import { useSelector } from "react-redux";
import { getOrder } from "../../functions/users";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import Invoice from "../../order/Invoice";

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

        <div class="col text-center">
          <div className="row">
            <h2>History</h2>
            {/* การ loop ซ้อน loop */}
            {/* 1 loop order card */}
            {orders.map((item, index) => {
              console.log(item);
              return (
                <div className="card m-3" key={index}>
                  <p>Order {"    " + item.orderstatus}</p>
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
                  {/* PDF */}
                  <div className="row">
                    <div className="col">
                      <PDFDownloadLink
                        document={<Invoice order={item} />}
                        fileName="invoice.pdf"
                        className="btn btn-primary m-1"
                      >
                        PDF Download
                      </PDFDownloadLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
