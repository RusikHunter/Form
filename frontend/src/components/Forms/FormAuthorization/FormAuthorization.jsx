import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from 'react-toastify'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setIsLogged, setCurrentUser } from "../../../store/reducers/userReducer"
import { useNavigate } from "react-router-dom"
import "../Form.scss"

export default function FormAuthorization() {
    const schema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().required("Password is required"),
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data)

        const userData = {
            email: data.email,
            password: data.password,
        }

        toast.promise(
            axios.post(
                "https://users-database-fenr.onrender.com/users/login",
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ),
            {
                pending: 'Authorization...',
                success: 'Welcome!',
                error: 'Authorization failed. Please try again.',
                hideProgressBar: true,
            }
        ).then((response) => {
            console.log('success')
            const data = response.data
            dispatch(setIsLogged(true))
            dispatch(setCurrentUser(data))
            navigate("/account")
        }).catch((error) => {
            const errorMessage = `${error.response?.data?.detail}.` || 'Authorization failed. Please try again.'
            toast.error(errorMessage, { hideProgressBar: true })
        }).finally(() => {
            reset()
        })
    }

    return (
        <form className="form form__autorization" noValidate onSubmit={handleSubmit(onSubmit)}>
            <label className="form__label" htmlFor="email">
                <span className="form__span" data-testid="form-span-email">Email</span>
                <input className="form__input" type="email" id="email" data-testid="form-input-email" name="email" {...register("email")} />
                {errors.email && <p className="form__error" data-testid="form-error-email">{errors.email.message}</p>}
            </label>

            <label className="form__label" htmlFor="password">
                <span className="form__span" data-testid="form-span-password">Password</span>
                <input className="form__input" type="password" id="password" name="password" {...register("password")} />
                {errors.password && <p className="form__error" data-testid="form-error-password">{errors.password.message}</p>}
            </label>

            <button className="form__submit" type="submit" data-testid="form-submit">Log in</button>
        </form>
    )
}