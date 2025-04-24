import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { useDispatch } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux"
import FormRegistration from "./FormRegistration"
import { createStore } from "redux"
import { toast } from "react-toastify"

const mockStore = createStore((state = {
    user: { isLogged: false, currentUser: {} },
    client: { theme: 'light' }
}) => state)

vi.mock("../../store/reducers/clientReducer", () => ({
    setTheme: vi.fn(() => ({ type: "SET_THEME" }))
}))

vi.mock("react-toastify", () => ({
    toast: {
        promise: vi.fn(() => Promise.resolve()),
        error: vi.fn()
    }
}))

vi.mock("react-redux", async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        useDispatch: vi.fn(),
        Provider: actual.Provider,
    }
})

describe("FormRegistration component - required fields", () => {
    it("shows error for empty username and submits form", async () => {
        const mockDispatch = vi.fn()
        useDispatch.mockReturnValue(mockDispatch)

        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={vi.fn()} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            expect(screen.getByText(/Username is required/i)).toBeInTheDocument()
        })

        fireEvent.change(screen.getByTestId("form-input-username"), { target: { value: "testUser" } })
        fireEvent.change(screen.getByTestId("form-input-email"), { target: { value: "test@example.com" } })
        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "password123" } })
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "password123" } })

        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            expect(toast.promise).toHaveBeenCalled()
        })

        expect(mockDispatch).not.toHaveBeenCalled()
    })

    it("shows error when email is invalid", async () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={vi.fn()} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.change(screen.getByTestId("form-input-email"), { target: { value: "invalidEmail" } })
        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            setTimeout(() => {
                expect(screen.getByText(/Invalid email/i)).toBeInTheDocument()
            }, 1000)
        })
    })

    it("should trigger changeMode when form is successfully submitted", async () => {
        const changeModeMock = vi.fn()
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={changeModeMock} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.change(screen.getByTestId("form-input-username"), { target: { value: "testUser" } })
        fireEvent.change(screen.getByTestId("form-input-email"), { target: { value: "test@example.com" } })
        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "password123" } })
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "password123" } })

        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            expect(changeModeMock).toHaveBeenCalled()
        })
    })

    it("shows error when passwords don't match", async () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={vi.fn()} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "password123" } })
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "password321" } })
        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            expect(screen.getByText(/Passwords must match/i)).toBeInTheDocument()
        })
    })
})

describe("FormRegistration component - incorrect form data", () => {
    it("shows error when email format is incorrect like 'test@com'", async () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={vi.fn()} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.change(screen.getByTestId("form-input-username"), { target: { value: "testUser" } })

        fireEvent.change(screen.getByTestId("form-input-email"), { target: { value: "test@com" } })

        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "password123" } })
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "password123" } })

        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            setTimeout(() => {
                expect(screen.getByText(/Invalid email/i)).toBeInTheDocument()
            }, 1000)
        })
    })

    it("shows error when password is shorter than 6 characters", async () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={vi.fn()} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.change(screen.getByTestId("form-input-username"), { target: { value: "testUser" } })
        fireEvent.change(screen.getByTestId("form-input-email"), { target: { value: "test@example.com" } })
        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "123" } }) // короткий пароль
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "123" } })

        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument()
        })
    })

    it("shows error when passwords don't match", async () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={vi.fn()} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.change(screen.getByTestId("form-input-username"), { target: { value: "testUser" } })
        fireEvent.change(screen.getByTestId("form-input-email"), { target: { value: "test@example.com" } })

        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "password123" } })
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "differentPassword" } })

        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            expect(screen.getByText(/Passwords must match/i)).toBeInTheDocument()
        })
    })
})

describe("FormRegistration component - requests", () => {
    it("submits the form successfully with valid data", async () => {
        const changeModeMock = vi.fn()

        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={changeModeMock} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.change(screen.getByTestId("form-input-username"), { target: { value: "validUser" } })
        fireEvent.change(screen.getByTestId("form-input-email"), { target: { value: "valid@example.com" } })
        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "validPass123" } })
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "validPass123" } })

        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            expect(toast.promise).toHaveBeenCalled()
        })

        await waitFor(() => {
            expect(changeModeMock).toHaveBeenCalled()
        })
    })

    it("displays error toast on server error", async () => {
        const changeModeMock = vi.fn()

        toast.promise.mockImplementation(() => Promise.reject({
            response: {
                data: {
                    detail: "Server error occurred"
                }
            }
        }))

        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={changeModeMock} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.change(screen.getByTestId("form-input-username"), { target: { value: "validUser" } })
        fireEvent.change(screen.getByTestId("form-input-email"), { target: { value: "valid@example.com" } })
        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "validPass123" } })
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "validPass123" } })

        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(
                "Server error occurred.",
                expect.objectContaining({ hideProgressBar: true })
            )
        })

        expect(changeModeMock).not.toHaveBeenCalled()
    })
})

describe("FormRegistration component - toast", () => {
    it("displays toast messages for server error and success on valid form submission", async () => {
        const changeModeMock = vi.fn()

        toast.promise.mockImplementation((promise, { pending, success, error }) => {
            expect(pending).toBe('Registering user...')

            promise.then(() => {
                expect(success).toBe('User successfully registered!')
            })

            promise.catch(() => {
                expect(error).toBe('Registration failed. Please try again.')
            })

            return promise
        })

        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={changeModeMock} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.change(screen.getByTestId("form-input-username"), { target: { value: "validUser" } })
        fireEvent.change(screen.getByTestId("form-input-email"), { target: { value: "valid@example.com" } })
        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "validPass123" } })
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "validPass123" } })

        toast.promise.mockImplementationOnce(() =>
            Promise.reject({
                response: {
                    data: {
                        detail: "Server error"
                    }
                }
            })
        )

        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            expect(toast.promise).toHaveBeenCalledWith(
                expect.any(Promise),
                expect.objectContaining({
                    pending: 'Registering user...',
                    error: 'Registration failed. Please try again.',
                    hideProgressBar: true
                })
            )
        })

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Server error.', expect.objectContaining({ hideProgressBar: true }))
        })

        fireEvent.change(screen.getByTestId("form-input-username"), { target: { value: "anotherValidUser" } })
        fireEvent.change(screen.getByTestId("form-input-email"), { target: { value: "anotherValid@example.com" } })
        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "anotherValidPass123" } })
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "anotherValidPass123" } })

        toast.promise.mockImplementationOnce(() => Promise.resolve())

        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            expect(toast.promise).toHaveBeenCalledWith(
                expect.any(Promise),
                expect.objectContaining({
                    pending: 'Registering user...',
                    success: 'User successfully registered!',
                    hideProgressBar: true
                })
            )
        })

        expect(changeModeMock).toHaveBeenCalled()
    })
})

describe("FormRegistration component - side effects", () => {
    it("clears the form after submission (success or error)", async () => {
        const changeModeMock = vi.fn()

        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={changeModeMock} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.change(screen.getByTestId("form-input-username"), { target: { value: "validUser" } })
        fireEvent.change(screen.getByTestId("form-input-email"), { target: { value: "valid@example.com" } })
        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "validPass123" } })
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "validPass123" } })

        toast.promise.mockImplementationOnce(() =>
            Promise.reject({
                response: {
                    data: {
                        detail: "Server error"
                    }
                }
            })
        )

        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Server error.', expect.objectContaining({ hideProgressBar: true }))
        })

        await waitFor(() => {
            expect(screen.getByTestId("form-input-username").value).toBe("")
            expect(screen.getByTestId("form-input-email").value).toBe("")
            expect(screen.getByTestId("form-input-password").value).toBe("")
            expect(screen.getByTestId("form-input-repeat-password").value).toBe("")
        })

        fireEvent.change(screen.getByTestId("form-input-username"), { target: { value: "anotherValidUser" } })
        fireEvent.change(screen.getByTestId("form-input-email"), { target: { value: "anotherValid@example.com" } })
        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "anotherValidPass123" } })
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "anotherValidPass123" } })

        toast.promise.mockImplementationOnce(() => Promise.resolve())

        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            expect(screen.getByTestId("form-input-username").value).toBe("")
            expect(screen.getByTestId("form-input-email").value).toBe("")
            expect(screen.getByTestId("form-input-password").value).toBe("")
            expect(screen.getByTestId("form-input-repeat-password").value).toBe("")
        })
    })

    it("calls changeMode after successful registration", async () => {
        const changeModeMock = vi.fn()

        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={changeModeMock} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.change(screen.getByTestId("form-input-username"), { target: { value: "validUser" } })
        fireEvent.change(screen.getByTestId("form-input-email"), { target: { value: "valid@example.com" } })
        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "validPass123" } })
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "validPass123" } })

        toast.promise.mockImplementationOnce(() => Promise.resolve())

        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            expect(changeModeMock).toHaveBeenCalled()
        })
    })
})

describe("FormRegistration component - UI elements", () => {
    it("renders the registration form with all components", () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={vi.fn()} />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByTestId("form-input-username")).toBeInTheDocument()
        expect(screen.getByTestId("form-input-email")).toBeInTheDocument()
        expect(screen.getByTestId("form-input-password")).toBeInTheDocument()
        expect(screen.getByTestId("form-input-repeat-password")).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    })

    it("shows validation error messages when required fields are empty", async () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={vi.fn()} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            setTimeout(() => {
                expect(screen.getByText(/Username is required/i)).toBeInTheDocument()
                expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
                expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
                expect(screen.getByText(/Please confirm your password/i)).toBeInTheDocument()
            }, 1000)
        })
    })

    it("renders input fields with entered values", () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={vi.fn()} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.change(screen.getByTestId("form-input-username"), { target: { value: "testUser" } })
        fireEvent.change(screen.getByTestId("form-input-email"), { target: { value: "test@example.com" } })
        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "password123" } })
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "password123" } })

        expect(screen.getByTestId("form-input-username").value).toBe("testUser")
        expect(screen.getByTestId("form-input-email").value).toBe("test@example.com")
        expect(screen.getByTestId("form-input-password").value).toBe("password123")
        expect(screen.getByTestId("form-input-repeat-password").value).toBe("password123")
    })

    it("renders the submit button and it is clickable", () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={vi.fn()} />
                </MemoryRouter>
            </Provider>
        )

        const button = screen.getByRole('button', { name: /sign up/i })
        expect(button).toBeInTheDocument()

        fireEvent.click(button)
    })

    it("shows error when passwords don't match", async () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <FormRegistration changeMode={vi.fn()} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.change(screen.getByTestId("form-input-password"), { target: { value: "password123" } })
        fireEvent.change(screen.getByTestId("form-input-repeat-password"), { target: { value: "password321" } })
        fireEvent.click(screen.getByText(/sign up/i))

        await waitFor(() => {
            expect(screen.getByText(/Passwords must match/i)).toBeInTheDocument()
        })
    })
})