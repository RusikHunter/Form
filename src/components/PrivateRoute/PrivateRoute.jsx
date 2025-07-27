import React from "react"
import { Navigate } from "react-router-dom";

function PrivateRoute({ isLogged, children }) {
    return isLogged ? children : <Navigate to="/" />
}

export default PrivateRoute