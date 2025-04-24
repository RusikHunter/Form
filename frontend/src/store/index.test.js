import { describe, it, expect } from 'vitest'
import store from './index'
import { setTheme } from './reducers/clientReducer'
import { setIsLogged, setCurrentUser } from './reducers/userReducer'

describe('Redux store configuration', () => {
    it('should initialize the store with correct initial state', () => {
        const initialState = store.getState()

        expect(initialState.client).toEqual({
            theme: 'light',
        });

        expect(initialState.user).toEqual({
            isLogged: false,
            currentUser: {},
        })
    })

    it('should handle setTheme action correctly', () => {
        let currentState = store.getState()
        expect(currentState.client.theme).toBe('light')

        store.dispatch(setTheme())

        currentState = store.getState()
        expect(currentState.client.theme).toBe('dark')

        store.dispatch(setTheme())

        currentState = store.getState()
        expect(currentState.client.theme).toBe('light')
    })

    it('should handle setIsLogged action correctly', () => {
        let currentState = store.getState()
        expect(currentState.user.isLogged).toBe(false)

        store.dispatch(setIsLogged(true))

        currentState = store.getState()
        expect(currentState.user.isLogged).toBe(true)
    })

    it('should handle setCurrentUser action correctly', () => {
        let currentState = store.getState()
        expect(currentState.user.currentUser).toEqual({})

        const user = { id: 1, name: 'John Doe' }
        store.dispatch(setCurrentUser(user))

        currentState = store.getState()
        expect(currentState.user.currentUser).toEqual(user)
    })
})
