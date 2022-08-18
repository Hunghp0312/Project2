import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import Profile from "./user/Profile";
import AdminDashboard from "./user/AdminDashboard";
import AdminRoute from "./auth/AdminRoute";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Order from "./admin/Order";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import ManageProduct from "./admin/ManageProduct";
import ManageCategory from "./admin/ManageCategory";
import ProductUpdate from "./admin/ProductUpdate";
import CategoryUpdate from "./admin/CategoryUpdate";
import UserOrder from "./user/UserOrder";
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
                <Route path="/product/:productId" exact element={<Product />} />
                <Route path="/cart" exact element={<Cart />} />
                <Route
                    path="/admin/orders"
                    exact
                    element={
                        <AdminRoute>
                            <Order />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/user/orders"
                    exact
                    element={
                        <PrivateRoute>
                            <UserOrder />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/products"
                    exact
                    element={
                        <AdminRoute>
                            <ManageProduct />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/categories"
                    exact
                    element={
                        <AdminRoute>
                            <ManageCategory />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/product/update/:productId"
                    exact
                    element={
                        <AdminRoute>
                            <ProductUpdate />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/category/update/:categoryId"
                    exact
                    element={
                        <AdminRoute>
                            <CategoryUpdate />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/profile/:userId"
                    exact
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
export default Routers;
