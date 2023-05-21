import React from "react";
import MenubarUser from "../../layouts/MenubarUser";

const Home = () => {
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <MenubarUser />
        </div>

        <div class="col">
          <div className="row">
            <h2>home user</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
