import React, { useState, useEffect } from "react";
import { useSelelector, useDispatch } from "react-redux";
import ProductCart from "../card/ProductCard";
//function
import { listProduct } from "../functions/product";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProduct(12)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2>Filter / Serch</h2>
          </div>
          <div className="col-md-9">
            {loading ? (
              <h2 className="text-danger">Loading.....</h2>
            ) : (
              <h2 className="text-info">Product</h2>
            )}
            {product.length < 1 && <p>No Product In Warehouse</p>}

            <div className="row pb-5">
              {product.map((item, index) => (
                <div key={index} className="col-md-4 mt-3">
                  <ProductCart product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
