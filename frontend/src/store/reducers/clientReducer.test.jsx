import clientReducer, { setTheme } from './clientReducer'

describe('clientSlice', () => {
    // Проверка начального состояния
    it('should return the initial state', () => {
        const initialState = {
            theme: 'light',
        }

        const state = clientReducer(undefined, {})

        expect(state).toEqual(initialState)
    })

    // Тест для действия setTheme
    it('should handle setTheme', () => {
        // Начальное состояние
        const initialState = {
            theme: 'light',
        }

        // Проверка переключения темы с light на dark
        let state = clientReducer(initialState, setTheme())
        expect(state.theme).toBe('dark')

        // Проверка переключения темы с dark на light
        state = clientReducer(state, setTheme())
        expect(state.theme).toBe('light')
    })
})
