import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AdminRoute from "./auth/AdminRoute";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/signin" exact element={<Signin />} />
                <Route path="/signup" exact element={<Signup />} />
                <Route path="/shop" exact element={<Shop />} />
                <Route
                    path="/user/dashboard"
                    exact
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/dashboard"
                    exact
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/create/category"
                    exact
                    element={
                        <AdminRoute>
                            <AddCategory />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/create/product"
                    exact
                    element={
                        <AdminRoute>
                            <AddProduct />
                        </AdminRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
export default Routers;
