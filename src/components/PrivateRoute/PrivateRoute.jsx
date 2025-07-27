import React from "react"
import { Navigate } from "react-router-dom";
import routes from "@config/routes"

function PrivateRoute({ isLogged, children }) {
    return isLogged ? children : <Navigate to={routes.form} />
}

export default PrivateRoute