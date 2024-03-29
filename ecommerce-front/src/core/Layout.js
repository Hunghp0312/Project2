import React from "react";
import Menu from "./Menu";
import Footer from "../component/Footer";
import "../style.css";

function Layout({
    title = "Title",
    description = "Description",
    className,
    children,
}) {
    return (
        <div>
            <Menu />
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
            <Footer />
        </div>
    );
}

export default Layout;
