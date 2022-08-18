import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./ApiAdmin";
import { getCategories, list } from "../core/ApiCore";
function ManageProduct() {
    const [products, setProducts] = useState([]);
    const { user, token } = isAuthenticated();
    const [datas, setDatas] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false,
    });

    const { categories, category, search, results, searched } = datas;
    const loadCategories = () => {
        getCategories().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setDatas({ ...data, categories: data });
            }
        });
    };
    const loadProducts = () => {
        getProducts().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };
    useEffect(() => {
        loadCategories();
        loadProducts();
    }, []);
    const searchData = () => {
        console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category }).then(
                (response) => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setDatas({
                            ...datas,
                            results: response,
                            searched: true,
                        });
                        setProducts(response);
                    }
                }
            );
        }
    };
    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    };
    const handlerChange = (name) => (event) => {
        setDatas({ ...datas, [name]: event.target.value, searched: false });
    };
    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select
                            className="btn mr-2"
                            onChange={handlerChange("category")}
                        >
                            <option value="All">All</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="search"
                        className="form-control"
                        onChange={handlerChange("search")}
                        placeholder="Search by name"
                    />
                </div>
                <div
                    className="btn input-group-append"
                    style={{ border: "none" }}
                >
                    <button className="input-group-text">Button</button>
                </div>
            </span>
        </form>
    );

    const destroy = (productId) => {
        deleteProduct(user._id, token, productId).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                searchData();
            }
        });
    };
    const searchedMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length <= 0) {
            return `No Product found`;
        }
    };
    const searchedProducts = (results = []) => {
        return (
            <ul className="list-group">
                {results.map((p, i) => (
                    <li
                        key={i}
                        className="mb-3 list-group-item d-flex justify-content-between align-items-center"
                    >
                        <strong>{p._id}</strong>
                        <strong>{p.name}</strong>
                        <Link to={`/admin/product/update/${p._id}`}>
                            <span className="badge badge-warning badge-pill">
                                Update
                            </span>
                        </Link>
                        <span
                            onClick={() => destroy(p._id)}
                            className="badge badge-danger badge-pill"
                        >
                            Delete
                        </span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Layout
            title="Manage Product"
            description={`Good day `}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    {searchForm()}
                    <h2 className="text-center">
                        {searchedMessage(searched, products)}
                    </h2>
                    <hr />
                    {searchedProducts(products)}
                </div>
            </div>
        </Layout>
    );
}
export default ManageProduct;
