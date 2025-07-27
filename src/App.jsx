import React, { useEffect } from "react"
import { Route, Routes } from 'react-router-dom'
import FormPage from "./pages/FormPage/FormPage"
import AccountPage from "./pages/AccountPage/AccountPage"
import ErrorPage from "./pages/ErrorPage/ErrorPage"
import Header from "./components/Header/Header"
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { setIsLogged, setCurrentUser } from "./store/reducers/userReducer"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"

export default function App() {
    const theme = useSelector(state => state.client.theme)
    const isLogged = useSelector(state => state.user.isLogged)
    const currentUser = useSelector(state => state.user.currentUser)

    const dispatch = useDispatch()

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
                <Routes>
                    <Route path="/" element={<FormPage />} />

                    <Route
                        path="/account"
                        element={
                            <PrivateRoute isLogged={isLogged}>
                                <AccountPage />
                            </PrivateRoute>
                        }
                    />

                    <Route path="*" element={<ErrorPage />} />
                </Routes>

                <ToastContainer data-testid="toast-container" />
            </main>
        </div>
    )
}