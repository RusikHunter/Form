import React, { useEffect, lazy, Suspense } from "react"
import { Route, Routes } from 'react-router-dom'
import Header from "./components/Header/Header"
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import routes from "@config/routes"

const FormPage = lazy(() => import("@pages/FormPage/FormPage"))
const AccountPage = lazy(() => import("@pages/AccountPage/AccountPage"))
const ErrorPage = lazy(() => import("@pages/ErrorPage/ErrorPage"))

export default function App() {
    const theme = useSelector(state => state.client.theme)
    const isLogged = useSelector(state => state.user.isLogged)
    const currentUser = useSelector(state => state.user.currentUser)

    useEffect(() => {
        document.body.setAttribute("data-js-theme", theme)
    }, [theme])

    useEffect(() => {
        localStorage.setItem("isLogged", JSON.stringify(isLogged))
    }, [isLogged])

    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <div data-testid="app-component">
            <Header />
            <main className="main">
                <Suspense fallback={<p className="loading-message">Loading...</p>}>
                    <Routes>
                        <Route path={routes.form} element={<FormPage />} />

                        <Route
                            path={routes.account}
                            element={
                                <PrivateRoute isLogged={isLogged}>
                                    <AccountPage />
                                </PrivateRoute>
                            }
                        />

                        <Route path={routes.notfound} element={<ErrorPage />} />
                    </Routes>
                </Suspense>

                <ToastContainer data-testid="toast-container" />
            </main>
        </div>
    )
}