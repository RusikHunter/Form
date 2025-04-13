import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'

describe('App component', () => {
    it('renders the FormPage component at the root path', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )
        expect(screen.getByTestId("form-page")).toBeInTheDocument()
    })

    it('renders the AccountPage component at the /account path', () => {
        render(
            <MemoryRouter initialEntries={['/account']}>
                <App />
            </MemoryRouter>
        )
        expect(screen.getByTestId("account-page")).toBeInTheDocument()
    })

    it('renders the ErrorPage component for undefined routes', () => {
        render(
            <MemoryRouter initialEntries={['/nonexistent']}>
                <App />
            </MemoryRouter>
        )
        expect(screen.getByTestId("error-page")).toBeInTheDocument()
    })
})