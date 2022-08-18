import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link, useParams, Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./ApiUser";
function Profile(props) {
    const [values, setValues] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        error: false,
        success: false,
    });
    const { token } = isAuthenticated();
    const { name, email, address, phone, error, success } = values;
    const { userId } = useParams();
    const init = (userId) => {
        read(userId, token).then((data) => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                });
            }
        });
    };
    useEffect(() => {
        init(userId);
    }, []);
    const clickSubmit = (e) => {
        e.preventDefault();
        update(userId, token, { name, email, phone, address }).then((data) => {
            if (data.error) {
                console.log(data);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true,
                    });
                });
            }
        });
    };
    const redirectUser = (success) => {
        if (success) {
            return <Navigate to="/cart"></Navigate>;
        }
    };
    const handlerChange = (name) => (e) => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };
    const profileUpdate = (name, email, phone, address) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    onChange={handlerChange("name")}
                    className="form-control"
                    value={name}
                />
                <label className="text-muted">Email</label>
                <input
                    type="text"
                    onChange={handlerChange("email")}
                    className="form-control"
                    value={email}
                />
                <label className="text-muted">Phone Number</label>
                <input
                    type="text"
                    onChange={handlerChange("phone")}
                    className="form-control"
                    value={phone}
                />
                <label className="text-muted">Address</label>
                <input
                    type="text"
                    onChange={handlerChange("address")}
                    className="form-control"
                    value={address}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );
    return (
        <Layout
            title="Product detail"
            description=""
            className="container-fluid"
        >
            {profileUpdate(name, email, phone, address)}
            {redirectUser(success)}
        </Layout>
    );
}
export default Profile;
