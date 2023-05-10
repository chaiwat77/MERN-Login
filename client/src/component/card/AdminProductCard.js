import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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
          <EditOutlined key="edit" className="text-warning" />,
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
