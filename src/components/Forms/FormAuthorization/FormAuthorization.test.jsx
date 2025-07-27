import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { vi } from "vitest"
import axios from "axios"
import FormAuthorization from "./FormAuthorization"
import configureStore from "redux-mock-store"
import { toast } from "react-toastify"

vi.mock("axios")
vi.mock("react-toastify", async () => {
    const actual = await vi.importActual("react-toastify")
    return {
        ...actual,
        toast: {
            promise: vi.fn((p) => p),
            error: vi.fn()
        }
    }
})

const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom")
    return {
        ...actual,
        useNavigate: () => mockNavigate
    }
})

const mockStore = configureStore()
const renderWithProviders = (store) => {
    return render(
        <Provider store={store}>
            <MemoryRouter>
                <FormAuthorization />
            </MemoryRouter>
        </Provider>
    )
}

describe("FormAuthorization - UI and Validation", () => {
    let store

    beforeEach(() => {
        store = mockStore({})
    })

    it("renders email and password fields", () => {
        renderWithProviders(store)
        expect(screen.getByTestId("form-span-email")).toBeInTheDocument()
        expect(screen.getByTestId("form-span-password")).toBeInTheDocument()
    })

    it("shows validation errors on empty submit", async () => {
        renderWithProviders(store)

        fireEvent.click(screen.getByTestId("form-submit"))

        await waitFor(() => {
            expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
            expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
        })
    })

    it("shows email format error", async () => {
        renderWithProviders(store)

        fireEvent.click(screen.getByTestId("form-submit"))

        fireEvent.input(screen.getByTestId("form-input-email"), {
            target: { value: "fdgdfgdfg" }
        })

        await waitFor(() => {
            setTimeout(() => {
                expect(screen.getByText(/Invalid email/i)).toBeInTheDocument()
            }, 1000)
        })
    })
})

describe("FormAuthorization - Success login", () => {
    it("submits form, calls toast.promise, dispatches actions and navigates on success", async () => {
        const store = mockStore({})
        const mockUser = { username: "test", email: "test@example.com" }

        const mockResponse = Promise.resolve({ data: mockUser })
        axios.post.mockImplementation(() => mockResponse)

        renderWithProviders(store)

        fireEvent.input(screen.getByLabelText(/Email/i), {
            target: { value: "test@example.com" }
        })
        fireEvent.input(screen.getByLabelText(/Password/i), {
            target: { value: "123456" }
        })

        fireEvent.click(screen.getByTestId("form-submit"))

        await waitFor(() => {
            expect(toast.promise).toHaveBeenCalledWith(
                expect.any(Promise),
                expect.objectContaining({
                    pending: 'Authorization...',
                    success: 'Welcome!',
                    error: 'Authorization failed. Please try again.',
                })
            )
        })

        await mockResponse

        expect(mockNavigate).toHaveBeenCalledWith("/account")

        const actions = store.getActions()
        expect(actions).toContainEqual({ type: "user/setIsLogged", payload: true })
        expect(actions).toContainEqual({ type: "user/setCurrentUser", payload: mockUser })
    })
})

describe("FormAuthorization - Error login", () => {
    it("shows error toast when login fails with 'user not found'", async () => {
        const store = mockStore({})

        const errorResponse = {
            response: {
                data: {
                    detail: "User not found"
                }
            }
        }

        axios.post.mockRejectedValueOnce(errorResponse)

        renderWithProviders(store)

        fireEvent.input(screen.getByLabelText(/Email/i), {
            target: { value: "nonexistent@example.com" }
        })
        fireEvent.input(screen.getByLabelText(/Password/i), {
            target: { value: "wrongpassword" }
        })

        fireEvent.click(screen.getByTestId("form-submit"))

        await waitFor(() => {
            expect(toast.promise).toHaveBeenCalled()
        })

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(
                "User not found.",
                expect.objectContaining({ hideProgressBar: true })
            )
        })
    })
})