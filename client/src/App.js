import React from "react";
import { Routes,Route } from 'react-router-dom'

//page
import Login from "./component/pages/auth/Login";
import Register from "./component/pages/auth/Register";
import Home from "./component/pages/Home";
// import router from "./component/routes/root";

//Layout
import Navbar from "./component/layouts/Navbar"


function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <RouterProvider router={router} /> */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>

    </div>
  );
}

export default App;
