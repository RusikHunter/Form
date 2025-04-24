import clientReducer, { setTheme } from './clientReducer'

describe('clientSlice', () => {
    it('should return the initial state', () => {
        const initialState = {
            theme: 'light',
        }

        const state = clientReducer(undefined, {})

        expect(state).toEqual(initialState)
    })

    it('should handle setTheme', () => {
        const initialState = {
            theme: 'light',
        }

        let state = clientReducer(initialState, setTheme())
        expect(state.theme).toBe('dark')

        state = clientReducer(state, setTheme())
        expect(state.theme).toBe('light')
    })
})
