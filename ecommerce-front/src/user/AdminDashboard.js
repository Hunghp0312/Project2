import React from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
function AdminDashboard() {
    const {
        user: { _id, name, email, role, phone, address },
    } = isAuthenticated();
    const adminInfo = () => (
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

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">
                            Create category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">
                            Create product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">
                            View Orders
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/products">
                            ManageProduct
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/categories">
                            ManageCategory
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
                <div className="col-3">{adminLinks()}</div>
                <div className="col-9">{adminInfo()}</div>
            </div>
        </Layout>
    );
}
export default AdminDashboard;
