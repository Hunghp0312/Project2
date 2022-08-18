import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listUserOrder } from "./ApiUser";
import { getStatusValues } from "../admin/ApiAdmin";
import moment from "moment";
function Order() {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const [status, setStatus] = useState("default");
    const { user, token } = isAuthenticated();
    const [orderDetailsVisible, setOrderDetailsVisible] = useState(false);
    const loadOrders = () => {
        listUserOrder(user._id, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };
    const loadStatusValues = () => {
        getStatusValues(user._id, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };
    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);
    console.log(orders.length);
    const showOrderLength = (status) => {
        if (orders.filter((order) => order.status === status).length > 0) {
            return (
                <h3 className="text-danger display-2">
                    {status} orders:{" "}
                    {orders.filter((order) => order.status === status).length}
                </h3>
            );
        } else {
            return (
                status !== "default" && (
                    <h3 className="text-danger">No orders</h3>
                )
            );
        }
    };
    const showFullOrderLength = () => {
        if (orders.length > 0) {
            return (
                <h3 className="text-danger display-2">
                    Total orders: {orders.length}
                </h3>
            );
        } else {
            return <h3 className="text-danger">No orders</h3>;
        }
    };
    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2 row">
            <div className="input-group-prepend col-3 text-center">{key}</div>
            <input
                type="text"
                value={value}
                className="form-control col-9"
                readOnly
            ></input>
        </div>
    );
    const displayAllOrder = () => {
        return (
            status === "default" && (
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {showFullOrderLength()}
                        {orders.map((o, oIndex) => {
                            return (
                                <div
                                    className="mt-5"
                                    key={oIndex}
                                    style={{ borderBottom: "5px solid indigo" }}
                                >
                                    <h2 className="mb-5">
                                        <span className="bg-primary">
                                            Order ID: {o._id}
                                        </span>
                                    </h2>
                                    <ul className="list-group mb-2">
                                        <li className="list-group-item">
                                            {showStatus(o)}
                                        </li>
                                        <li className="list-group-item">
                                            Total Price: {o.amount}
                                        </li>
                                        <li className="list-group-item">
                                            Ordered on:
                                            {moment(o.createdAt).fromNow()}
                                        </li>
                                        <li className="list-group-item">
                                            Ordered By: {o.user.name}
                                        </li>
                                        <li className="list-group-item">
                                            Delivery address: {o.address}
                                        </li>
                                        <li className="list-group-item">
                                            Phone: {o.phone}
                                        </li>
                                    </ul>
                                    <div className="row">
                                        <h3 className="col-9 mt-4 mb-4 font-italic">
                                            Total products in the order:
                                            {o.orderDetails.length}
                                        </h3>
                                        <button
                                            onClick={displayOrderDetail}
                                            className="col-3 btn btn-primary mr-1"
                                        >
                                            Show Order Details
                                        </button>
                                    </div>

                                    {orderDetailsVisible &&
                                        showOrderDetails(o, status)}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )
        );
    };
    const showOrderDetails = (o, status) => {
        return (
            <div>
                {o.orderDetails.map((p, pIndex) => {
                    return (
                        <div
                            className="mb-4"
                            key={pIndex}
                            style={{
                                paddding: "20px",
                                border: "1px solid indigo",
                            }}
                        >
                            {showInput("Product name", p.name)}
                            {showInput("Product price", p.price)}
                            {showInput("Product total", p.count)}
                            {showInput("Product Id", p._id)}
                        </div>
                    );
                })}
            </div>
        );
    };

    const showStatus = (o) => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
        </div>
    );
    const displayOrderDetail = () => {
        if (orderDetailsVisible) {
            setOrderDetailsVisible(false);
        } else {
            setOrderDetailsVisible(true);
        }
    };

    const optionOrder = () => (
        <div className="card">
            <h4 className="card-header">Choose Order Status</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <span
                        onClick={() => setStatus("Not Processed")}
                        className=""
                    >
                        Not Processed
                    </span>
                </li>

                <li className="list-group-item">
                    <span onClick={() => setStatus("Processing")} className="">
                        Processing
                    </span>
                </li>
                <li className="list-group-item">
                    <span onClick={() => setStatus("Shipping")} className="">
                        Shipping
                    </span>
                </li>
                <li className="list-group-item">
                    <span onClick={() => setStatus("Received")} className="">
                        Received
                    </span>
                </li>
                <li className="list-group-item">
                    <span onClick={() => setStatus("Cancelled")} className="">
                        Cancelled
                    </span>
                </li>
            </ul>
        </div>
    );
    const displayOrder = (status) => (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showOrderLength(status)}
                {orders
                    .filter((order) => order.status === status)
                    .map((o, oIndex) => {
                        return (
                            <div
                                className="mt-5"
                                key={oIndex}
                                style={{ borderBottom: "5px solid indigo" }}
                            >
                                <h2 className="mb-5">
                                    <span className="bg-primary">
                                        Order ID: {o._id}
                                    </span>
                                </h2>
                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        {showStatus(o)}
                                    </li>
                                    <li className="list-group-item">
                                        Total Price: {o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on:
                                        {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered By: {o.user.name}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery address: {o.address}
                                    </li>
                                    <li className="list-group-item">
                                        Phone: {o.phone}
                                    </li>
                                </ul>
                                <div className="row">
                                    <h3 className="col-9 mt-4 mb-4 font-italic">
                                        Total products in the order:
                                        {o.orderDetails.length}
                                    </h3>
                                    <button
                                        onClick={displayOrderDetail}
                                        className="col-3 btn btn-primary mr-1"
                                    >
                                        Show Order Details
                                    </button>
                                </div>

                                {orderDetailsVisible &&
                                    showOrderDetails(o, status)}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
    return (
        <Layout
            title="Order"
            description={`Good day ${user.name}, you can manage order`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">{optionOrder()}</div>
                <div className="col-9">
                    {displayAllOrder()}
                    {displayOrder(status)}
                </div>
            </div>
        </Layout>
    );
}
export default Order;
