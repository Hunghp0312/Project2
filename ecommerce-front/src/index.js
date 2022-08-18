import React from "react";
import ReactDOM from "react-dom";
import Routers from "./Routers";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
ReactDOM.render(
    <React.StrictMode>
        <Routers />
    </React.StrictMode>,
    document.getElementById("root")
);
