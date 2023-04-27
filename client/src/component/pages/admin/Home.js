import React from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";

const Home = () => {
  return (
    <div class="container-fluid">
      <div clsas="row">
        <div class="col-md-2">
          <MenubarAdmin />
        </div>

        <div class="col">
          <h1>Home Admin </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
