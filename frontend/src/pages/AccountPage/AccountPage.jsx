import React from "react"
import FormWrap from "../../components/FormWrap/FormWrap"
import "./AccountPage.scss"

export default function AccountPage() {
    return (
        <section className="account" data-testid="account-page">
            <div className="account__inner container">
                <div className="account__row row">
                    <div className="account__column column">
                        <FormWrap />
                    </div>
                </div>
            </div>
        </section>
    )
}