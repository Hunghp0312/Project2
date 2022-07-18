import React, { useState } from "react";
import Layout from "../core/Layout";
import { Navigate } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/index";
function Signin() {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false,
    });
    const { user } = isAuthenticated();
    const { email, password, error, loading, redirectToReferrer } = values;
    const handlerChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true,
                    });
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
    const showLoading = () =>
        loading && <div className="alert alert-info">Loading....</div>;
    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Navigate to="/admin/dashboard" />;
            } else {
                return <Navigate to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Navigate to="/" />;
        }
    };
    const signinForm = () => (
        <form>
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
                title="Signin Page"
                description="Signin to Node React E-commerce App"
                className="container col-md-8 offset-md-2"
            >
                {showError()}
                {showLoading()}
                {signinForm()}
                {redirectUser()}
            </Layout>
        </div>
    );
}

export default Signin;
