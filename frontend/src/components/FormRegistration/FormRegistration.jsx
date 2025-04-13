import React from "react"
import "./FormRegistration.scss"

export default function FormRegistration() {
    return (
        <form className="form form__autorization">
            <label className="form__label" htmlFor="username">
                <span className="form__span">Username</span>
                <input className="form__input" type="text" name="username" required />
            </label>

            <label className="form__label" htmlFor="email">
                <span className="form__span">Email</span>
                <input className="form__input" type="email" name="email" required />
            </label>

            <label className="form__label" htmlFor="password">
                <span className="form__span">Password</span>
                <input className="form__input" type="password" name="password" required />
            </label>

            <label className="form__label" htmlFor="repeatPassword">
                <span className="form__span">Repeat password</span>
                <input className="form__input" type="password" name="repeatPassword" required />
            </label>

            <button className="form__submit" type="submit">Sign up</button>
        </form>
    )
}