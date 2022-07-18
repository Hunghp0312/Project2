import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signup } from "../auth/index";
function Signup() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });
    const { name, email, password, error, success } = values;
    const handlerChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true,
                });
            }
        });
    };
    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );
    const showSucess = () => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            New account is created. Please <Link to="/signin"> Signin </Link>
        </div>
    );
    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handlerChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                ></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handlerChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                ></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handlerChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                ></input>
            </div>
            <button className="btn btn-primary" onClick={clickSubmit}>
                Submit
            </button>
        </form>
    );
    return (
        <div>
            <Layout
                title="Signup Page"
                description="Signup to Node React E-commerce App"
                className="container col-md-8 offset-md-2"
            >
                {showSucess()}
                {showError()}
                {signupForm()}
            </Layout>
        </div>
    );
}

export default Signup;
