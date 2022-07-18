import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getCategories } from "./ApiCore";
import Card from "./Card";

function Search() {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false,
    });

    const { categories, category, search, results, searched } = data;
    const loadCategories = () => {
        getCategories().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data });
            }
        });
    };
    useEffect(() => {
        loadCategories();
    });
    const searchData = () => {
        console.log(search, category);
    };
    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    };
    const handlerChange = (type) => (e) => {
        setData({ ...data, [type]: e.target.value, searched: false });
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
                            <option value="All">Pick Category</option>
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
    return (
        <div>
            <div className="container">{searchForm()}</div>
        </div>
    );
}
export default Search;
