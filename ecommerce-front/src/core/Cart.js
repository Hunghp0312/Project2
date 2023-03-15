import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart, removeProduct, updateProduct } from "./CartHelper";
import Card from "../component/Card";
import CheckOutItem from "../component/CheckOutItem"
import _ from "lodash";
import CheckOut from "../component/CheckOut";
import ShowImage from "../component/ShowImage";
function Cart(props) {
    const [items, setItems] = useState([]);

    const value = items.length;
    useEffect(() => {
        setItems((items) => getCart());
    }, [items]);

    const showItems = (items) => {
        return (
            <div>
                <h2>Your cart has {items.length} items</h2>
                <hr />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>PRODUCT DETAILS</th>
                            <th>QUANTITY</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((product, i) => (
                        <CheckOutItem
                            key={i}
                            product={product}
                        ></CheckOutItem>
                    ))}
                    </tbody>
                </table>

            </div>
        );
    };
    const noItemMessage = () => (
        <h2>
            Your cart is empty. <br /> <Link to="/shop"></Link>
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-9">
                    {items.length > 0 ? showItems(items) : noItemMessage()}
                </div>

                <div className="col-3">
                    <h2>Your Checkout</h2>
                    <CheckOut products={items}></CheckOut>
                </div>
            </div>
        </Layout>
    );
}

export default Cart;
