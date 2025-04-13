import React from "react"
import "./ThemeButton.scss"

export default function ThemeButton() {
    return (
        <button className="button--toggle-theme">
            <div className="button--toggle-theme-decoration"></div>
        </button>
    )
}