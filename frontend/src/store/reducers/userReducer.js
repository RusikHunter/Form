import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLogged: false,
        currentUser: {}
    },
    reducers: {
        setIsLogged: (state) => {
            state.isLogged = !state.isLogged
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        }
    },
})

export const { setIsLogged, setCurrentUser } = userSlice.actions

export default userSlice.reducer