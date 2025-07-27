import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "@components/Forms/Form.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@config/firebase";

// Схема валидации вне компонента
const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
});

export default function FormRegistration({ changeMode }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            toast.info("Registering user...");

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                username: data.username,
                email: data.email,
                status: "User",
            });

            toast.success("User successfully registered!");
            reset();
            changeMode();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                toast.error("Email already in use.");
            } else {
                toast.error(`Registration error: ${error.message}`);
            }
            console.error(error);
        }
    };

    return (
        <form
            className="form form__registration"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <label className="form__label" htmlFor="username">
                <span className="form__span">Username</span>
                <input
                    id="username"
                    className="form__input"
                    type="text"
                    data-testid="form-input-username"
                    {...register("username")}
                    aria-invalid={errors.username ? "true" : "false"}
                    aria-describedby={errors.username ? "username-error" : undefined}
                />
                {errors.username && (
                    <p id="username-error" className="form__error" role="alert">
                        {errors.username.message}
                    </p>
                )}
            </label>

            <label className="form__label" htmlFor="email">
                <span className="form__span">Email</span>
                <input
                    id="email"
                    className="form__input"
                    type="email"
                    data-testid="form-input-email"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                    <p id="email-error" className="form__error" role="alert">
                        {errors.email.message}
                    </p>
                )}
            </label>

            <label className="form__label" htmlFor="password">
                <span className="form__span">Password</span>
                <input
                    id="password"
                    className="form__input"
                    type="password"
                    data-testid="form-input-password"
                    {...register("password")}
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? "password-error" : undefined}
                />
                {errors.password && (
                    <p id="password-error" className="form__error" role="alert">
                        {errors.password.message}
                    </p>
                )}
            </label>

            <label className="form__label" htmlFor="repeatPassword">
                <span className="form__span">Repeat password</span>
                <input
                    id="repeatPassword"
                    className="form__input"
                    type="password"
                    data-testid="form-input-repeat-password"
                    {...register("repeatPassword")}
                    aria-invalid={errors.repeatPassword ? "true" : "false"}
                    aria-describedby={errors.repeatPassword ? "repeatPassword-error" : undefined}
                />
                {errors.repeatPassword && (
                    <p id="repeatPassword-error" className="form__error" role="alert">
                        {errors.repeatPassword.message}
                    </p>
                )}
            </label>

            <button className="form__submit" type="submit" data-testid="submit-button">
                Sign up
            </button>
        </form>
    );
}