import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "./ApiAdmin";
function ManageCategory() {
    const [categories, setCategories] = useState([]);
    const { user, token } = isAuthenticated();
    const loadCategories = () => {
        getCategories().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        });
    };
    const destroy = (categoryId) => {
        deleteCategory(user._id, token, categoryId).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadCategories();
            }
        });
    };
    useEffect(() => {
        loadCategories();
    }, []);
    return (
        <Layout
            title="Manage Product"
            description={`Good day `}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Total {categories.length}</h2>
                    <hr />
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {categories.map((c, i) => (
                            <tr
                                key={i}
                                
                            >
                                <th>{c.name}</th>
                                <td>
                                    <Link to={`/admin/category/update/${c._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                    onClick={() => destroy(c._id)}
                                    className="badge badge-danger badge-pill"
                                    >
                                        Delete
                                    </button>
                                </td>
                                
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </Layout>
    );
}
export default ManageCategory;
