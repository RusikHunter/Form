import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'
import App from './App.jsx'

// Проверка рендеринга главного компонента с корректным Redux Store и BrowserRouter
describe('main.jsx', () => {
    it('renders the App component correctly with Redux and Router', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        )

        // Проверяем, что приложение отрендерилось
        const appElement = screen.getByTestId('app-component')
        expect(appElement).toBeInTheDocument()
    })

    it('should have a valid Redux store with initial state', () => {
        // Проверяем, что состояние store корректно
        const state = store.getState()

        // Проверяем начальное состояние
        expect(state.client.theme).toBe('light') // Начальное значение 'light' для theme
        expect(state.user.isLogged).toBe(false) // Начальное значение false для isLogged
        expect(state.user.currentUser).toEqual({}) // Начальное значение пустой объект
    })
})