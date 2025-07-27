import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setIsLogged, setCurrentUser } from "@store/reducers/userReducer"
import { useNavigate } from "react-router-dom"
import "@components/Forms/Form.scss"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@config/firebase"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@config/firebase"

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
        try {
            toast.info("Authorizing...")

            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
            const user = userCredential.user

            const userDocRef = doc(db, "users", user.uid)
            const userDocSnap = await getDoc(userDocRef)

            const userData = userDocSnap.exists() ? userDocSnap.data() : {}

            dispatch(setIsLogged(true))
            dispatch(setCurrentUser({
                id: user.uid,
                email: user.email,
                ...userData
            }))

            toast.success("Welcome!")
            navigate("/account")
            reset()
        } catch (error) {
            if (error.message === "Firebase: Error (auth/invalid-credential).") {
                toast.error("Invalid credential.")
            } else {
                toast.error("Authorization error: ", error.message)
            }
        }
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