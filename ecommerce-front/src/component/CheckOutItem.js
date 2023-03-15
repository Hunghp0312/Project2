import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ShowImage from "./ShowImage";
import { API } from "../config";
import { addItem, updateProduct, removeProduct } from "../core/CartHelper";
function Card({
    product,
}) {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const shouldRedirect = (redirect) => {
        if (redirect) {
            return <Navigate to="/cart"></Navigate>;
        }
    };
    useEffect(()=>{

        updateProduct(product._id,count)
    },[count])
    
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
            (
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
        <tr>
            
                <td>
                    <div className="product-img">
                        <img
                        src={`${API}/product/photo/${product._id}`}
                        alt={product.name}
                        className="mb-3"
                        style={{ maxHeight: "90px", maxWidth: "120px" }}
                        />
                        <span className="align-top font-weight-bold">{product.name}</span>
                    </div>

                </td>
                <td className="align-middle">
                    <button className="button button-minus" onClick={()=>{if(count>1){setCount(parseInt(count)-1)}else{removeProduct(product._id)}}}>-</button>
                    <input  type="number" 
                        className="input-count"
                        value={count}
                        onChange={handlerChange(product._id)}></input>
                    <button className="button button-plus" onClick={()=>{if(count<product.quantity){setCount(parseInt(count)+1)}}}>+</button>
                </td>
                <th className="align-middle"><h3>{product.price*count}</h3></th>
                


        </tr>
    );
}
export default Card;
