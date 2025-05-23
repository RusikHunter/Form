import React from "react"
import "./AccountWrap.scss"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import exitIcon from "../../images/icons/exit.png"

export default function AccountWrap() {
    const currentUser = useSelector((state) => state.user.currentUser)

    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/")
    }

    return (
        <div className="account-wrap">
            <div className="account-wrap__tools">
                <button className="account-wrap__button--exit" onClick={handleClick} data-testid="account-wrap-button-exit">
                    <img className="account-wrap__icon" src={exitIcon} alt="Exit" width={24} height={24} />
                </button>
            </div>
            <div className="account-wrap__content">
                <h2 className="account-wrap__username">{currentUser.username}</h2>
                <span className="account-wrap__id">ID: {currentUser.id}</span>

                <p className="account-wrap__email">Email: {currentUser.email}</p>
                <p className="account-wrap__status">Status: {currentUser.status}</p>
            </div>
        </div>
    )
}