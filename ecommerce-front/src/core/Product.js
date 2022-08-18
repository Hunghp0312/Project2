import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { Link, Navigate } from "react-router-dom";
import { getSingleProduct, listRelated } from "./ApiCore";
import Card from "../component/Card";
import Search from "../component/Search";
import Comment from "../component/Comment";
import ShowImage from "../component/ShowImage";
import { addItem, updateProduct, removeProduct } from "../core/CartHelper";
function Product(props) {
    const [redirect, setRedirect] = useState(false);
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState({});
    const { productId } = useParams();

    const shouldRedirect = (redirect) => {
        if (redirect) {
            return <Navigate to="/cart"></Navigate>;
        }
    };
    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };
    const loadSingleProduct = (productId) => {
        getSingleProduct(productId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                listRelated(data._id).then((relatedData) => {
                    if (relatedData.error) {
                        setError(relatedData.error);
                    } else {
                        setRelatedProduct(relatedData);
                        console.log(relatedProduct);
                    }
                });
            }
        });
    };
    console.log(props);
    useEffect(() => {
        loadSingleProduct(productId);
    }, []);
    const inStock = () => {
        return (
            product.quantity !== 0 && (
                <div className="row">
                    <p className="ml-4">In stock: {product.quantity}</p>
                    <p className="ml-4">Sold: {product.sold}</p>
                </div>
            )
        );
    };
    const outOfStock = () => {
        return (
            product.quantity === 0 && (
                <span className="ml-3 badge badge-warning badge-pill">
                    Out of Stock
                </span>
            )
        );
    };
    const addToCartButton = () => {
        return (
            product.quantity !== 0 && (
                <button
                    onClick={addToCart}
                    className="btn btn-outline-warning mt-2 mb-2"
                >
                    Add to card
                </button>
            )
        );
    };
    return (
        <Layout
            title="Product detail"
            description=""
            className="container-fluid"
        >
            {shouldRedirect(redirect)}
            <div className="row">
                <div className="col-4">
                    <ShowImage item={product} url="product"></ShowImage>
                </div>
                <div className="col-8">
                    {" "}
                    <h2 className="ml-2"> {product.name}</h2>
                    <p className="ml-2"> Description: {product.description}</p>
                    <h4 className="text-danger ml-2">
                        Price: ₫{product.price}
                    </h4>
                    {inStock()}
                    {outOfStock()}
                    {addToCartButton()}
                </div>
            </div>
            <hr />
            <Comment productId={productId}></Comment>

            <hr />
            <h2>Related Product</h2>
            <div className="row">
                {relatedProduct &&
                    relatedProduct.map((p, i) => (
                        <div key={i} className="col-3 mb-3">
                            <Card key={i} product={p} />
                        </div>
                    ))}
            </div>
        </Layout>
    );
}

export default Product;
