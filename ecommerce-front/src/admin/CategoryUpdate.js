import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getCategories, updateCategory, getCategory } from "./ApiAdmin";
import { useParams, Navigate, Link } from "react-router-dom";
function CategoryUpdate() {
    const { categoryId } = useParams();
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();
    const handlerChange = (e) => {
        setError("");
        setName(e.target.value);
    };
    useEffect(() => {
        getCategory(categoryId).then((data) => {
            if (data.error) {
                setError(true);
            } else {
                setName(data.name);
            }
        });
    }, []);
    console.log(name);
    const clickSubmit = (e) => {
        e.preventDefault();
        setError(false);
        setSuccess(false);
        //make request to api to create category
        updateCategory(user._id, token, categoryId, { name }).then((data) => {
            if (data.error) {
                setError(true);
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };
    const showSucess = () => {
        if (success) {
            return <h3 className="text-success">{name} is updated</h3>;
        }
    };
    const showError = () => {
        if (error) {
            return <h3 className="text-danger">update fail</h3>;
        }
    };
    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/categories" className="text-warning">
                Back to manage category
            </Link>
        </div>
    );
    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handlerChange}
                    value={name}
                    autoFocus
                ></input>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    );
    return (
        <Layout
            title="Add a new category"
            description={`Good day ${user.name}`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSucess()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
}
export default CategoryUpdate;
