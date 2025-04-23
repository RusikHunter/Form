import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { vi } from "vitest"
import configureStore from "redux-mock-store"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom")
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

import AccountWrap from "./AccountWrap"

const mockStore = configureStore([])

const mockUser = {
    username: "testuser",
    id: "12345",
    email: "test@example.com",
    status: "active"
}

const renderWithProviders = (store) => {
    return render(
        <Provider store={store}>
            <MemoryRouter>
                <AccountWrap />
            </MemoryRouter>
        </Provider>
    )
}

describe("AccountWrap component", () => {
    it("should display user data correctly", () => {
        const store = mockStore({
            user: {
                currentUser: mockUser
            }
        })

        renderWithProviders(store)

        expect(screen.getByText("testuser")).toBeInTheDocument()
        expect(screen.getByText(/ID: 12345/i)).toBeInTheDocument()
        expect(screen.getByText(/Email: test@example.com/i)).toBeInTheDocument()
        expect(screen.getByText(/Status: active/i)).toBeInTheDocument()
    })

    it("should navigate to home page on exit button click", () => {
        const store = mockStore({
            user: {
                currentUser: mockUser
            }
        })

        renderWithProviders(store)

        const button = screen.getByTestId("account-wrap-button-exit")
        fireEvent.click(button)

        expect(mockNavigate).toHaveBeenCalledWith("/")
    })
})