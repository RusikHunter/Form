import React, { useEffect } from "react"
import FormWrap from "../../components/FormWrap/FormWrap"
import { useDispatch } from "react-redux"
import { setIsLogged, setCurrentUser } from "../../store/reducers/userReducer"
import "./FormPage.scss"

export default function FormPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIsLogged(false))
        dispatch(setCurrentUser({}))
    }, [])

    return (
        <section className="form" data-testid="form-page">
            <div className="form__inner container">
                <div className="form__row row">
                    <div className="form__column column">
                        <FormWrap />
                    </div>
                </div>
            </div>
        </section>
    )
}