import React from "react"
import "./Header.scss"

export default function Header() {
    return (
        <header data-testid="section-header" className="header">
            <div className="header__inner container">
                <div className="header__row row">
                    <div className="header_column header__column--1 column">
                        <a className="header__logo" href="#">dmfshoveForm</a>
                    </div>

                    <div className="header_column header__column--2 column">
                        <button className="header__button--toggle-theme">
                            <div className="header__button--toggle-theme-decoration"></div>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}