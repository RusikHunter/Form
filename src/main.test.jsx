import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'
import App from './App.jsx'

describe('main.jsx', () => {
    it('renders the App component correctly with Redux and Router', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        )

        const appElement = screen.getByTestId('app-component')
        expect(appElement).toBeInTheDocument()
    })

    it('should have a valid Redux store with initial state', () => {
        const state = store.getState()

        expect(state.client.theme).toBe('light')
        expect(state.user.isLogged).toBe(false)
        expect(state.user.currentUser).toEqual({})
    })
})