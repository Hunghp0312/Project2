import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";
import { itemTotal } from "./CartHelper";
function Menu() {
    let navigate = useNavigate();
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/shop">
                        Shop
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/cart">
                        Cart{" "}
                        <sup>
                            <small className="cart-badge">{itemTotal()}</small>
                        </sup>
                    </Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link text-light"
                            to="/user/dashboard"
                        >
                            Dashboard
                        </Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link text-light"
                            to="/admin/dashboard"
                        >
                            Dashboard
                        </Link>
                    </li>
                )}
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/signin">
                                Signin
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/signup">
                                Signup
                            </Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <span
                            className="nav-link text-light"
                            style={{ cursor: "pointer", color: "#ffffff" }}
                            onClick={() =>
                                signout(() => {
                                    navigate("/");
                                })
                            }
                        >
                            Signout
                        </span>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Menu;
