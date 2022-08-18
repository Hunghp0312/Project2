import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "./ApiCore";
import Card from "../component/Card";
import Search from "../component/Search";
function Home() {
    const [productsBySold, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);
    const loadProductsBySell = () => {
        getProducts("sold").then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };
    const loadProductsByArrival = () => {
        getProducts("createdAt").then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };
    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);
    console.log(productsBySold);
    return (
        <Layout
            title="Home Page"
            description="Node React E-commerce App"
            className="container-fluid"
        >
            <Search></Search>
            <h2 className="mb-4">Best Seller</h2>
            <div className="row">
                {productsBySold.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card key={i} product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default Home;
