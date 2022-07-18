import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from ".";

function AdminRoute(props) {
    if (isAuthenticated() && isAuthenticated().user.role === 1) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        console.log(props);
        return props.children;
    }
    return <Navigate to="/signin" state={{ from: props.location }} replace />;
}
export default AdminRoute;
