import userReducer, { setIsLogged, setCurrentUser } from './userReducer'

describe('userSlice', () => {
    // Проверка начального состояния
    it('should return the initial state', () => {
        const initialState = {
            isLogged: false,
            currentUser: {},
        }

        const state = userReducer(undefined, {})

        expect(state).toEqual(initialState)
    })

    // Тест для действия setIsLogged
    it('should handle setIsLogged', () => {
        const initialState = {
            isLogged: false,
            currentUser: {},
        }

        // Проверка изменения isLogged с false на true
        let state = userReducer(initialState, setIsLogged(true))
        expect(state.isLogged).toBe(true)

        // Проверка изменения isLogged с true на false
        state = userReducer(state, setIsLogged(false))
        expect(state.isLogged).toBe(false)
    })

    // Тест для действия setCurrentUser
    it('should handle setCurrentUser', () => {
        const initialState = {
            isLogged: false,
            currentUser: {},
        }

        const newUser = {
            id: 1,
            name: 'John Doe',
        }

        // Проверка изменения currentUser
        const state = userReducer(initialState, setCurrentUser(newUser))
        expect(state.currentUser).toEqual(newUser)
    })
})

