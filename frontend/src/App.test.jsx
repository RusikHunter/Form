import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { toast } from 'react-toastify'
import App from './App.jsx'

const mockStore = createStore((state = {
    user: { isLogged: true, currentUser: {} },
    client: { theme: 'light' }
}) => state)

describe('App component', () => {
    it('renders the FormPage component at the root path', () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        expect(screen.getByTestId("form-page")).toBeInTheDocument()
    })

    it('renders the AccountPage component at the /account path when logged in', () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter initialEntries={['/account']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        expect(screen.getByTestId("account-page")).toBeInTheDocument()
    })

    it('renders the FormPage component at the /account path when not logged in', () => {
        const loggedOutStore = createStore((state = {
            user: { isLogged: false, currentUser: {} },
            client: { theme: 'light' }
        }) => state)

        render(
            <Provider store={loggedOutStore}>
                <MemoryRouter initialEntries={['/account']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        expect(screen.getByTestId("form-page")).toBeInTheDocument()
    })

    it('renders the AccountPage component at the /account path', () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter initialEntries={['/account']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        expect(screen.getByTestId("account-page")).toBeInTheDocument()
    })

    it('renders the ErrorPage component for undefined routes', () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter initialEntries={['/nonexistent']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        expect(screen.getByTestId("error-page")).toBeInTheDocument()
    })

    it('applies the correct theme from the Redux store to the body', () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        expect(document.body.getAttribute('data-js-theme')).toBe('light')
    })

    it('renders the ToastContainer and shows a toast message when triggered', async () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>
        )

        toast('Test toast message')

        await waitFor(() => {
            expect(screen.getByText('Test toast message')).toBeInTheDocument()
        })
    })
})