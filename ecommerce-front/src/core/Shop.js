import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import CheckBox from "../component/CheckBox";
import { getCategories, getFilteredProduct } from "./ApiCore";
import { prices } from "./FixedPrices";
import RadioBox from "../component/RadioBox";
import Card from "../component/Card";
function Shop() {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] },
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState(0);
    const init = () => {
        getCategories().then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };
    useEffect(() => {
        init();
        loadFilteredResults(myFilters.filters);
    }, []);
    const handlerPrice = (value) => {
        const data = prices;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };
    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProduct(toSkip, limit, myFilters.filters).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };
    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };
    const loadFilteredResults = (newFilters) => {
        console.log(newFilters);
        getFilteredProduct(skip, limit, newFilters).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };
    const handlerFilters = (filters, filterBy) => {
        //console.log(filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        if (filterBy === "price") {
            let priceValues = handlerPrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };
    return (
        <Layout
            title="Shop Page"
            description="Search and find what u need"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">
                    <h4>Filter by Category</h4>
                    <ul>
                        <CheckBox
                            categories={categories}
                            handlerFilters={(filters) =>
                                handlerFilters(filters, "category")
                            }
                        />
                    </ul>
                    <h4>Filter by Price range</h4>
                    <ul>
                        <RadioBox
                            prices={prices}
                            handlerFilters={(filters) =>
                                handlerFilters(filters, "price")
                            }
                        />
                    </ul>
                </div>
                <div className="col-9">
                    <h2 className="mb-4"> Products </h2>
                    <div className="row">
                        {filteredResults &&
                            filteredResults.map((p, i) => (
                                <div className="col-4">
                                    <Card key={i} product={p}></Card>
                                </div>
                            ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    );
}
export default Shop;
