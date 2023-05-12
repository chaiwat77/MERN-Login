import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AdminProductCard = ({ product, handleRemove }) => {
  // console.log(product);
  const { _id, title, description, images } = product;
  const { Meta } = Card;

  return (
    <div>
      <Card
        hoverable
        cover={
          <img
            className="m-2"
            style={{ height: "150px", objectFit: "cover" }}
            alt="example"
            src={images && images.length ? images[0].url : ""}
          />
        }
        actions={[
          <Link to={"/admin/update-product/" + _id}>
            <EditOutlined key="edit" className="text-warning" />
          </Link>,
          <DeleteOutlined
            className="text-danger"
            onClick={() => handleRemove(_id)}
          />,
        ]}
      >
        <Meta title={title} description={description} />
      </Card>
    </div>
  );
};

export default AdminProductCard;
