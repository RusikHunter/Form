import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"
import { toast } from 'react-toastify'
import "../Form.scss"

export default function FormRegistration({ changeMode }) {
    const schema = yup.object().shape({
        username: yup.string().required("Username is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        repeatPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], "Passwords must match")
            .required("Please confirm your password")
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        console.log(data)

        const userData = {
            username: data.username,
            email: data.email,
            password: data.password,
            status: "User"
        }

        toast.promise(
            axios.post(
                "https://users-database-fenr.onrender.com/users",
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ),
            {
                pending: 'Registering user...',
                success: 'User successfully registered!',
                error: 'Registration failed. Please try again.',
                hideProgressBar: true,
            }
        )
            .then(() => {
                changeMode()
            })
            .catch((error) => {
                const errorMessage = `${error.response?.data?.detail}.` || 'Registration failed. Please try again.'
                toast.error(errorMessage, { hideProgressBar: true })
            })
            .finally(() => {
                reset()
            })
    }

    return (
        <>
            <form className="form form__registration" onSubmit={handleSubmit(onSubmit)}>
                <label className="form__label" htmlFor="username">
                    <span className="form__span">Username</span>
                    <input className="form__input" type="text" data-testid="form-input-username" name="username" {...register("username")} />
                    {errors.username && <p className="form__error">{errors.username.message}</p>}
                </label>

                <label className="form__label" htmlFor="email">
                    <span className="form__span">Email</span>
                    <input className="form__input" type="email" data-testid="form-input-email" name="email" {...register("email")} />
                    {errors.email && <p className="form__error">{errors.email.message}</p>}
                </label>

                <label className="form__label" htmlFor="password">
                    <span className="form__span">Password</span>
                    <input className="form__input" type="password" data-testid="form-input-password" name="password" {...register("password")} />
                    {errors.password && <p className="form__error">{errors.password.message}</p>}
                </label>

                <label className="form__label" htmlFor="repeatPassword">
                    <span className="form__span">Repeat password</span>
                    <input className="form__input" type="password" data-testid="form-input-repeat-password" name="repeatPassword" {...register("repeatPassword")} />
                    {errors.repeatPassword && <p className="form__error">{errors.repeatPassword.message}</p>}
                </label>

                <button className="form__submit" type="submit">Sign up</button>
            </form>
        </>
    )
}