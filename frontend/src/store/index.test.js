import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import store from './index'; // путь к вашему store файлу
import clientReducer from './reducers/clientReducer';
import userReducer from './reducers/userReducer';
import { setTheme } from './reducers/clientReducer' // Импорт действия setTheme
import { setIsLogged, setCurrentUser } from './reducers/userReducer'

describe('Redux store configuration', () => {
    it('should initialize the store with correct initial state', () => {
        const initialState = store.getState();

        // Проверяем начальное состояние для редьюсера client
        expect(initialState.client).toEqual({
            theme: 'light', // укажите начальное значение для clientReducer
        });

        // Проверяем начальное состояние для редьюсера user
        expect(initialState.user).toEqual({
            isLogged: false,
            currentUser: {},
        })
    })

    it('should handle setTheme action correctly', () => {
        // Проверка начального состояния темы
        let currentState = store.getState()
        expect(currentState.client.theme).toBe('light')

        // Действие setTheme переключает тему
        store.dispatch(setTheme())

        // Проверяем, что тема изменилась на 'dark'
        currentState = store.getState()
        expect(currentState.client.theme).toBe('dark')

        // Еще раз вызываем setTheme для переключения обратно
        store.dispatch(setTheme())

        // Проверяем, что тема вернулась на 'light'
        currentState = store.getState()
        expect(currentState.client.theme).toBe('light')
    })

    // Тест для setIsLogged
    it('should handle setIsLogged action correctly', () => {
        // Проверка начального состояния флага авторизации
        let currentState = store.getState()
        expect(currentState.user.isLogged).toBe(false)

        // Действие setIsLogged изменяет флаг на true
        store.dispatch(setIsLogged(true))

        // Проверяем, что флаг авторизации стал true
        currentState = store.getState()
        expect(currentState.user.isLogged).toBe(true)
    })

    // Тест для setCurrentUser
    it('should handle setCurrentUser action correctly', () => {
        // Проверка начального состояния currentUser
        let currentState = store.getState()
        expect(currentState.user.currentUser).toEqual({})

        // Действие setCurrentUser изменяет данные пользователя
        const user = { id: 1, name: 'John Doe' }
        store.dispatch(setCurrentUser(user))

        // Проверяем, что данные текущего пользователя обновились
        currentState = store.getState()
        expect(currentState.user.currentUser).toEqual(user)
    })
})
