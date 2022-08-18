import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrder, getStatusValues, updateOrderStatus } from "./ApiAdmin";
import moment from "moment";
function Order() {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const { user, token } = isAuthenticated();
    const [orderDetailsVisible, setOrderDetailsVisible] = useState(false);
    const [status, setStatus] = useState("Default");
    const loadOrders = () => {
        listOrder(user._id, token).then((data) => {
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

    const showOrderLength = (status) => {
        if (orders.length > 0) {
            return (
                <h1 className="text-danger display-2">
                    Total orders:{" "}
                    {orders.filter((order) => order.status === status).length}
                </h1>
            );
        } else {
            return <h1 className="text-danger">No orders</h1>;
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
    const handlerStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            (data) => {
                if (data.error) {
                    console.log("data update fail");
                } else {
                    loadOrders();
                }
            }
        );
    };
    const showOrderDetails = (o) => {
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
            <select
                className="form-control"
                onChange={(e) => handlerStatusChange(e, o._id)}
                value={status}
            >
                <option>Update Status</option>
                {statusValues.map((currentStatus, index) => (
                    <option key={index} value={currentStatus}>
                        {currentStatus}
                    </option>
                ))}
            </select>
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
                <div className="col-9"> {displayOrder(status)}</div>
            </div>
        </Layout>
    );
}
export default Order;
