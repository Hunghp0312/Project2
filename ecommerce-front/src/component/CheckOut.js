import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, createOrder } from "../core/ApiCore";
import Card from "./Card";
import { emptyCart } from "../core/CartHelper";
import { isAuthenticated } from "../auth";
function CheckOut({ products }) {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    const [successCheckout, setSuccessCheckout] = useState(false);
    const [datas, setDatas] = useState({
        address: "",
        phone: "",
    });
    const { address, phone } = datas;
    const getTotal = () => {
        return products.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.count * currentValue.price;
        }, 0);
    };
    const createOrderData = {
        orderDetails: products,
        amount: getTotal(),
        address: address,
        phone: phone,
    };
    const clickSubmit = (event) => {
        event.preventDefault();
        console.log(createOrderData);
        createOrder(userId, token, createOrderData);
        emptyCart(() => {
            setSuccessCheckout(true);
            setDatas({ ...datas, address: "", phone: "" });
        });
    };

    const handlerChange = (name) => (event) => {
        const value = event.target.value;
        setDatas({ ...datas, [name]: value });
        console.log(datas);
    };
    const showSuccessCheckout = (successCheckout) => {
        return (
            successCheckout && (
                <h4 className="text-success"> Checkout Success</h4>
            )
        );
    };
    const checkOutForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Delivery address</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handlerChange("address")}
                    value={address}
                ></input>
                <label className="text-muted">Phone</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handlerChange("phone")}
                    value={phone}
                ></input>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    );
    return (
        <div>
            <h2>Total: {getTotal()}₫</h2>
            {isAuthenticated() ? (
                checkOutForm()
            ) : (
                <Link to="/signin">
                    {" "}
                    <button className="btn btn-primary">
                        Signin to checkout
                    </button>
                </Link>
            )}
            {showSuccessCheckout(successCheckout)}
        </div>
    );
}

export default CheckOut;
