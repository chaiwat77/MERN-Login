import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCart from "../card/ProductCard";
import { Slider, Checkbox } from "antd";
//function
import { listProduct, searchFilters } from "../functions/product";
import { listCategory } from "../functions/category";
const Shop = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const { search } = useSelector((state) => ({ ...state }));

  //category
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);
  // console.log(search.text);
  const { text } = search;

  //1 all data
  useEffect(() => {
    loadData();
    listCategory().then((res) => setCategory(res.data));
  }, []);
  // console.log(category);

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

  //2 load data for filter
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDataFilter({ query: text });
      if (!text) {
        loadData();
      }
    }, 500);
    // เมื่อมีการใส่ timeout ต้องมีการ clearTimeout
    return () => clearTimeout(delay);
  }, [text]);

  // 3.Load price slider
  useEffect(() => {
    fetchDataFilter({ price });
  }, [ok]);

  //Filter
  const fetchDataFilter = (arg) => {
    searchFilters(arg)
      .then((res) => {
        setProduct(res.data);
        // console.log("fetch", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePrice = (value) => {
    // console.log(value);
    setPrice(value);
    setTimeout(() => {
      // ค่าตรงกันข้าม false > true
      setOk(!ok);
    }, 300);
  };

  const handleCheck = (e) => {
    // console.log(e.target.value);
    //ค่าปัจจุบัน check
    let inCheck = e.target.value;
    //ค่าเดิม check
    let inState = [...categorySelect];
    //ค้นหาในค่าเดิม ว่า incheck มีค่าหรือยัง
    let findCheck = inState.indexOf(inCheck);
    // ถ้ายังไม่มี  array push เข้าไป
    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      // ถ้ามีแล้วก็ splice ลบทิ้ง
      inState.splice(findCheck, 1);
    }
    setCategorySelect(inState);
    // console.log(inState);
    fetchDataFilter({ category: inState });
    if (inState.length < 1) {
      loadData();
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2>Filter / Serch</h2>
            <hr />
            <Slider range max={100000} onChange={handlePrice} value={price} />
            <hr />
            <h3>ค้นหาตามหมวดหมู่</h3>
            {category.map((item, index) => (
              <div style={{ display: "flex" }}>
                <Checkbox value={item._id} onChange={handleCheck}>
                  {item.name}
                </Checkbox>
              </div>
            ))}
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
