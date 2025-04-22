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

    useEffect(() => {
        document.body.setAttribute("data-js-theme", theme)
    }, [theme])

    return (
        <>
            <Header />
            <main className="main">
                <Routes>
                    <Route path="/" element={<FormPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>

                <ToastContainer />
            </main>
        </>
    )
}