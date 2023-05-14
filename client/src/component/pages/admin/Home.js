import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { listProduct, removeProduct } from "../../functions/product";
import AdminProductCard from "../../card/AdminProductCard";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadData(100);
  }, []);

  const loadData = (count) => {
    setLoading(true);

    listProduct(count)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    // console.log(id);
    if (window.confirm("Delete ?")) {
      removeProduct(user.token, id)
        .then((res) => {
          toast.success("Delete" + res.data.title + "Success");
          loadData(100);
          // console.log(res);
        })
        .catch((err) => {
          // console.log(err);
          toast.error("Remove Error");
        });
    }
  };

  return (
    <div class="container-fluid">
      <div clsas="row">
        <div class="col-md-2">
          <MenubarAdmin />
        </div>

        <div class="col">
          {loading ? <h1>Loading....</h1> : <h1>Home Admin </h1>}
          {/* {JSON.stringify(product)} */}
          <div className="row">
            {product.map((item) => (
              <div className="col-md-3 pb-2" key={item._id}>
                <AdminProductCard product={item} handleRemove={handleRemove} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
