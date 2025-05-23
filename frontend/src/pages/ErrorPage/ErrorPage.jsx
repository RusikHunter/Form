import React from "react"
import "./ErrorPage.scss"

export default function ErrorPage() {
    return (
        <section className="error" data-testid="error-page">
            <div className="error__inner container">
                <div className="error__row row">
                    <div className="error__column column">
                        <h1 className="error__message">Page not found</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}