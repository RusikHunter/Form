import React from "react"
import "./AccountWrap.scss"
import exitIcon from "../../images/icons/exit.png"

export default function AccountWrap() {
    return (
        <div className="account-wrap">
            <div className="account-wrap__tools">
                <button className="account-wrap__button--exit">
                    <img className="account-wrap__icon" src={exitIcon} alt="Exit" width={24} height={24} />
                </button>
            </div>
            <div className="account-wrap__content">
                <h2 className="account-wrap__username">dmfshove</h2>
                <span className="account-wrap__id">ID: 390821</span>

                <p className="account-wrap__email">funnymoments610@gmail.com</p>
                <p className="account-wrap__status">Status: Admin</p>
            </div>
        </div>
    )
}