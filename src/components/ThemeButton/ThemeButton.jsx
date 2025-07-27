import React from "react"
import { useDispatch } from 'react-redux'
import { setTheme } from "@store/reducers/clientReducer.js"
import "./ThemeButton.scss"

export default function ThemeButton() {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setTheme())
    }

    return (
        <button className="button--toggle-theme" onClick={handleClick}>
            <div className="button--toggle-theme-decoration"></div>
        </button>
    )
}