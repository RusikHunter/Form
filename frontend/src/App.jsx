import React, { useEffect } from "react"
import { Route, Routes } from 'react-router-dom'
import FormPage from "./pages/FormPage/FormPage"
import AccountPage from "./pages/AccountPage/AccountPage"
import ErrorPage from "./pages/ErrorPage/ErrorPage"
import Header from "./components/Header/Header"
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'


export default function App() {
    const theme = useSelector(state => state.client.theme)
    const isLogged = useSelector(state => state.user.isLogged)

    useEffect(() => {
        document.body.setAttribute("data-js-theme", theme)
    }, [theme])

    return (
        <div data-testid="app-component">
            <Header />
            <main className="main">
                <Routes>
                    <Route path="/" element={<FormPage />} />
                    {isLogged
                        ?
                        <Route path="/account" element={<AccountPage />} />
                        :
                        <Route path="/account" element={<FormPage />} />
                    }
                    <Route path="*" element={<ErrorPage />} />
                </Routes>

                <ToastContainer data-testid="toast-container" />
            </main>
        </div>
    )
}