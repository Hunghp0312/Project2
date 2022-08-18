import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getPurchareHistory } from "./ApiUser";
function Dashboard() {
    const {
        user: { _id, name, email, role, phone, address },
    } = isAuthenticated();
    const userInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">Name: {name}</li>
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">
                    Role: {role === 1 ? "Admin" : "user"}
                </li>
                <li className="list-group-item">
                    {" "}
                    Phone: {phone ? phone : "Blank"}
                </li>
                <li className="list-group-item">
                    {" "}
                    Address: {address ? address : "Blank"}
                </li>
            </ul>
        </div>
    );

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/user/orders">
                            View Order
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };
    return (
        <Layout
            title="Dashboard"
            description={`Good day ${name}`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">{userInfo()}</div>
            </div>
        </Layout>
    );
}
export default Dashboard;
