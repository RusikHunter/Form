import React from "react"
import "./Header.scss"
import ThemeButton from "@components/ThemeButton/ThemeButton"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Header() {
    const isLogged = useSelector(state => state.user.isLogged)
    const currentUser = useSelector(state => state.user.currentUser)

    return (
        <header data-testid="section-header" className="header">
            <div className="header__inner container">
                <div className="header__row row">
                    <div className="header_column header__column--1 column">
                        <Link className="header__logo" to="/">dmfshoveForm</Link>
                    </div>

                    <div className="header__link-wrap">
                        {isLogged &&
                            <Link className="header__link--account" to="/account">{currentUser.username.slice(0, 1).toUpperCase()}</Link>
                        }
                    </div>

                    <div className="header_column header__column--2 column">
                        <ThemeButton />
                    </div>
                </div>
            </div>
        </header>
    )
}