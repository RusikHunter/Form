import React from "react"
import "./FormAuthorization.scss"

export default function FormAuthorization() {
    return (
        <form className="form form__autorization">
            <label className="form__label" htmlFor="email">
                <span className="form__span">Email</span>
                <input className="form__input" type="email" name="email" required />
            </label>

            <label className="form__label" htmlFor="password">
                <span className="form__span">Password</span>
                <input className="form__input" type="password" name="password" required />
            </label>

            <button className="form__submit" type="submit">Log in</button>
        </form>
    )
}