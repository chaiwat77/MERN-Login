import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { listProduct } from "../../functions/product";
import AdminProductCard from "../../card/AdminProductCard";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData(1);
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
                <AdminProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
