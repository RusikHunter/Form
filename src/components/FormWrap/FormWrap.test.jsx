import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { createStore } from 'redux'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import FormWrap from "./FormWrap"

const mockStore = createStore((state = {
    user: { isLogged: true, currentUser: {} },
    client: { theme: 'light' }
}) => state)

vi.mock("../FormRegistration/FormRegistration", () => ({
    default: () => <div>Registration Form</div>
}))

vi.mock("../FormAuthorization/FormAuthorization", () => ({
    default: () => <div>Authorization Form</div>
}))

describe("FormWrap component", () => {
    it("renders registration form by default", () => {
        render(<Provider store={mockStore}>
            <MemoryRouter initialEntries={['/']}>
                <FormWrap />
            </MemoryRouter>
        </Provider>)

        expect(screen.getByAltText("Sign Up")).toBeInTheDocument()
    })

    it("toggles between registration and authorization forms", () => {
        render(<Provider store={mockStore}>
            <MemoryRouter initialEntries={['/']}>
                <FormWrap />
            </MemoryRouter>
        </Provider>)

        const toggleButton = screen.getByRole("button")

        fireEvent.click(toggleButton)
        expect(screen.getByAltText("Log In")).toBeInTheDocument()

        fireEvent.click(toggleButton)
        expect(screen.getByAltText("Sign Up")).toBeInTheDocument()
    })
})