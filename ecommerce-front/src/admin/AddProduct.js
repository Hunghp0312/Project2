import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "./ApiAdmin";

function AddProduct() {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: "",
    });
    const {
        name,
        description,
        price,
        categories,
        quantity,
        error,
        loading,
        createdProduct,
        formData,
    } = values;
    useEffect(() => {
        init();
    });
    const init = () => {
        getCategories().then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData(),
                });
            }
        });
    };
    const handlerChange = (type) => (event) => {
        const value =
            type === "photo" ? event.target.files[0] : event.target.value;

        formData.set(type, value);
        setValues({ ...values, [type]: value });
        console.log(values);
    };
    const clickSubmit = (event) => {
        console.log(values);
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        createProduct(user._id, token, formData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error, createdProduct: "" });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    error: "",
                    quantity: "",
                    photo: "",
                    loading: false,
                    createdProduct: data.name,
                });
            }
        });
    };
    const showError = () => {
        if (error) {
            return <div className="alert alert-danger">{error}</div>;
        }
    };
    const showSuccess = () => {
        if (createdProduct) {
            return (
                <div className="alert alert-success">
                    <h2>{`${createdProduct}`} is created</h2>
                </div>
            );
        }
    };
    const showLoading = () => {
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );
    };
    const newProductForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        onChange={handlerChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                    ></input>
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handlerChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                ></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    onChange={handlerChange("description")}
                    className="form-control"
                    value={description}
                ></textarea>
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input
                    onChange={handlerChange("price")}
                    type="number"
                    className="form-control"
                    value={price}
                ></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select
                    onChange={handlerChange("category")}
                    className="form-control"
                >
                    <option>Please select categories</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    <option value="62d2aaceb421ecea095087dc">T-shirt</option>
                    <option value="62d2aa34b421ecea095087d5">PHP</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input
                    onChange={handlerChange("quantity")}
                    type="number"
                    className="form-control"
                    value={quantity}
                ></input>
            </div>
            <button className="btn btn-outline-primary">Create Product</button>
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
                    {showSuccess()}
                    {showLoading()}
                    {newProductForm()}
                </div>
            </div>
        </Layout>
    );
}
export default AddProduct;
