import { createSlice } from '@reduxjs/toolkit'

const clientSlice = createSlice({
    name: "client",
    initialState: {
        theme: "light"
    },
    reducers: {
        setTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        }
    },
})

export const { setTheme } = clientSlice.actions

export default clientSlice.reducer