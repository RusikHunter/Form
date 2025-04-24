import userReducer, { setIsLogged, setCurrentUser } from './userReducer'

describe('userSlice', () => {
    it('should return the initial state', () => {
        const initialState = {
            isLogged: false,
            currentUser: {},
        }

        const state = userReducer(undefined, {})

        expect(state).toEqual(initialState)
    })

    it('should handle setIsLogged', () => {
        const initialState = {
            isLogged: false,
            currentUser: {},
        }

        let state = userReducer(initialState, setIsLogged(true))
        expect(state.isLogged).toBe(true)

        state = userReducer(state, setIsLogged(false))
        expect(state.isLogged).toBe(false)
    })

    it('should handle setCurrentUser', () => {
        const initialState = {
            isLogged: false,
            currentUser: {},
        }

        const newUser = {
            id: 1,
            name: 'John Doe',
        }

        const state = userReducer(initialState, setCurrentUser(newUser))
        expect(state.currentUser).toEqual(newUser)
    })
})

