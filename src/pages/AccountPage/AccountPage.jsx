import React from "react"
import AccountWrap from "@components/AccountWrap/AccountWrap"
import "./AccountPage.scss"

export default function AccountPage() {
    return (
        <section className="account" data-testid="account-page">
            <div className="account__inner container">
                <div className="account__row row">
                    <div className="account__column column">
                        <AccountWrap />
                    </div>
                </div>
            </div>
        </section>
    )
}