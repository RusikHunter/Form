import React, { useCallback } from "react"
import { useState } from "react"
import FormRegistration from "@components/Forms/FormRegistration/FormRegistration"
import FormAuthorization from "@components/Forms/FormAuthorization/FormAuthorization"
import signupIcon from "@assets/icons/signup.png"
import loginIcon from "@assets/icons/login.png"
import "./FormWrap.scss"

export default function FormWrap() {
    const [mode, setMode] = useState("signup")

    const handleClick = useCallback(() => {
        setMode(prevMode => (prevMode === "signup" ? "login" : "signup"))
    }, [mode])

    return (
        <div className="form-wrap">
            <div className="form-wrap__tools">
                <button className="form-wrap__button--toggle-mode" onClick={handleClick}>
                    <div className="form-wrap__button-icon">
                        {mode === 'signup'
                            ?
                            <img
                                src={signupIcon}
                                alt="Sign Up"
                                width={24}
                                height={24}
                                className={`form-wrap__icon`}
                            />
                            :
                            <img
                                src={loginIcon}
                                alt="Log In"
                                width={24}
                                height={24}
                                className={`form-wrap__icon`}
                            />
                        }
                    </div>
                </button>
            </div>

            <div className="form-wrap__content">
                <div className={`form-wrap__form-container`}>
                    {mode === 'signup'
                        ?
                        <FormRegistration changeMode={handleClick} />
                        :
                        <FormAuthorization />
                    }
                </div>
            </div>
        </div>
    )
}