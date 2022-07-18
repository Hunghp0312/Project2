import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "./ApiCore";
import Card from "./Card";
import Search from "./Search";
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
                    <Card key={i} product={product} />
                ))}
            </div>
        </Layout>
    );
}

export default Home;
