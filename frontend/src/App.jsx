import React from "react"
import { Route, Routes } from 'react-router-dom'
import FormPage from "./pages/FormPage/FormPage"
import AccountPage from "./pages/AccountPage/AccountPage"
import ErrorPage from "./pages/ErrorPage/ErrorPage"

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}