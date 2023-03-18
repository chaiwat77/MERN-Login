import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const router = createBrowserRouter([
    // {
    // path: "/",
    // element: <App />
    // },
    {
    path: "/register",
    element: <Register />
    },
    {
    path: "/login",
    element: <Login />
    },
]);

export default router;