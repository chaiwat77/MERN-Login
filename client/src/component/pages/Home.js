import React from "react";
import NewProduct from "../home/NewProduct";
import BestSeller from "../home/BestSeller";

const Home = () => {
  return (
    <div>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Product
      </h4>
      <NewProduct />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Saller
      </h4>
      <BestSeller />
    </div>
  );
};

export default Home;
