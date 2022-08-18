import React, { useEffect, useState } from "react";
import { getCategories, list } from "../core/ApiCore";
import Card from "./Card";

function Search() {
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
    useEffect(() => {
        loadCategories();
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
    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchedMessage(searched, results)}
                </h2>
                <div className="row">
                    {results.map((product, i) => (
                        <div className="col-4">
                            <Card key={i} product={product}></Card>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    const searchedMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length <= 0) {
            return `No Product found`;
        }
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
    return (
        <div className="row">
            <div className="container mb-3">{searchForm()}</div>
            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    );
}
export default Search;
