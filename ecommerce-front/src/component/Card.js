import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem, updateProduct, removeProduct } from "../core/CartHelper";
function Card({
    product,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
}) {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };
    const shouldRedirect = (redirect) => {
        if (redirect) {
            return <Navigate to="/cart"></Navigate>;
        }
    };
    const addToCartButton = (showAddToCartButton) => {
        return (
            product.quantity !== 0 &&
            showAddToCartButton && (
                <button
                    onClick={addToCart}
                    className="btn btn-outline-warning mt-2 mb-2"
                >
                    Add to card
                </button>
            )
        );
    };
    const handlerChange = (productId) => (event) => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= product.quantity) {
            setCount(product.quantity);
        }
        if (event.target.value >= 1 && event.target.value <= product.quantity) {
            updateProduct(productId, event.target.value);
        }
        if (event.target.value > product.quantity) {
            updateProduct(productId, product.quantity);
        }
    };
    const showCartUpdateButton = (cartUpdate) => {
        return (
            cartUpdate && (
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Adjust Quantity
                        </span>
                    </div>
                    <input
                        type="number"
                        className="form-control"
                        value={count}
                        onChange={handlerChange(product._id)}
                    ></input>
                </div>
            )
        );
    };
    const removeProductButton = (cartUpdate) => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => removeProduct(product._id)}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
                    <Link to="/cart"></Link>
                </button>
            )
        );
    };
    const inStock = () => {
        return (
            product.quantity !== 0 && (
                <div className="row">
                    <p className="ml-3">In stock: {product.quantity}</p>
                    <p className="ml-3">Sold: {product.sold}</p>
                </div>
            )
        );
    };
    const outOfStock = () => {
        return (
            product.quantity === 0 && (
                <span className="badge badge-warning badge-pill">
                    Out of Stock
                </span>
            )
        );
    };
    return (
        <div className="card mb-4">
            <div className="card-header">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product"></ShowImage>
                <p>Description: {product.description.substring(0, 50)}</p>
                <p>Price: {product.price}₫</p>
                {inStock()}
                {outOfStock()}
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                        View Product
                    </button>
                </Link>
                {addToCartButton(showAddToCartButton)}
                {removeProductButton(showRemoveProductButton)}
                {showCartUpdateButton(cartUpdate)}
            </div>
        </div>
    );
}
export default Card;
