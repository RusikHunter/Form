import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { useDispatch } from "react-redux"
import ThemeButton from "./ThemeButton"
import { createStore } from 'redux'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { setTheme } from "../../store/reducers/clientReducer"

const mockStore = createStore((state = {
    user: { isLogged: true, currentUser: {} },
    client: { theme: 'light' }
}) => state)

vi.mock("../../store/reducers/clientReducer", () => ({
    setTheme: vi.fn(() => ({ type: "SET_THEME" }))
}))

vi.mock("react-redux", async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        useDispatch: vi.fn(),
        Provider: actual.Provider,
    }
})

describe("ThemeButton component", () => {
    it("dispatches setTheme action when clicked", () => {
        const mockDispatch = vi.fn()
        useDispatch.mockReturnValue(mockDispatch)

        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <ThemeButton />
                </MemoryRouter>
            </Provider>
        )

        const button = screen.getByRole("button")
        fireEvent.click(button)

        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(setTheme).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_THEME" })
    })
})